import TokenBuffer from '../lexer/TokenBuffer'
import SyntaxError from '../errors/Syntax'
import { TOKEN_TYPE, IToken } from '../lexer/types/token'
import Node from './node/Node'
import ListNode from './node/ListNode'
import Operators from './Operators'
import SyntaxNode from './parser/SyntaxNode'
import ThrowNode from './parser/ThrowNode'
import SeparatorNode from './parser/SeparatorNode'
import TokenNode from './parser/TokenNode'
import AstNode from './parser/AstNode'
import OptionNode from './parser/OptionNode'
import OrNode from './parser/OrNode'
import RepeatNode from './parser/RepeatNode'
import ExpressionNode from './parser/ExpressionNode'

type NodeConstructor = new () => Node

class Parser {
  nodes: Array<SyntaxNode> = []
  NodeClass: new () => Node = null

  constructor(NodeClass?: NodeConstructor) {
    this.NodeClass = NodeClass
  }

  parse(tokenBuffer: TokenBuffer): Node {
    const node = this.NodeClass ? new this.NodeClass() : new ListNode()
    const startCursor = tokenBuffer.getCursor()
    let childrenNodes = []
    let isCritical = false
    let errMsg = null

    const handleNotMatch = (token?: IToken) => {
      if (isCritical) {
        const errToken = token || tokenBuffer.peek() || tokenBuffer.unread()
        tokenBuffer.setCursor(startCursor)
        throw new SyntaxError(`${errMsg || 'Unknown error'} token: ${errToken.value}`, errToken.range.start)
      }

      tokenBuffer.setCursor(startCursor)
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const syntaxNode = this.nodes[i]
      if (syntaxNode instanceof ThrowNode) {
        isCritical = true
        errMsg = syntaxNode.errMsg
        continue
      }

      const parsedNodes = syntaxNode.process(tokenBuffer)

      if (!parsedNodes || (parsedNodes instanceof Array && !parsedNodes.length)) {
        if (!syntaxNode.isOptional) {
          handleNotMatch()
          return null
        }
      }
      if (syntaxNode.shouldAddToTree && parsedNodes) {
        childrenNodes = childrenNodes.concat(parsedNodes)
      }
    }

    // update node location info with children info
    if (childrenNodes.length) {
      const firstNode = childrenNodes[0]
      const lastNode = childrenNodes[childrenNodes.length - 1]
      
      node.loc.start = firstNode.loc.start
      node.loc.end = lastNode.loc.end
    }
    return node.create(childrenNodes)
  }

  separator(sep: TOKEN_TYPE) {
    this.nodes.push(new SeparatorNode(sep))
    return this
  }

  token(tokenType: TOKEN_TYPE) {
    this.nodes.push(new TokenNode(tokenType))
    return this
  }

  ast(p: Parser) {
    this.nodes.push(new AstNode(p))
    return this
  }

  // bnf []
  option(p: Parser) {
    this.nodes.push(new OptionNode(p))
    return this
  }
  // bnf |
  or(...p: Array<Parser>) {
    this.nodes.push(new OrNode(...p))
    return this
  }

  // bnf {}
  repeat(p: Parser) {
    this.nodes.push(new RepeatNode(p))
    return this
  }

  throw(errMsg: string) {
    this.nodes.push(new ThrowNode(errMsg))
    return this
  }

  expression(factor: Parser, operators: Operators) {
    this.nodes.push(new ExpressionNode(factor, operators))
  }
}

export default Parser
