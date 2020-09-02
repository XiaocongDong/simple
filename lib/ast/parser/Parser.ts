import TokenBuffer from '../../lexer/TokenBuffer'
import SyntaxError from '../../errors/Syntax'
import { TOKEN_TYPE, IToken } from '../../lexer/types/token'
import Node from '../node/Node'
import ListNode from '../node/ListNode'
import Operators from './Operators'
import SyntaxNode from './SyntaxNode'
import SeparatorNode from './SeparatorNode'
import TokenNode from './TokenNode'
import AstNode from './AstNode'
import OptionNode from './OptionNode'
import OrNode from './OrNode'
import RepeatNode from './RepeatNode'
import ExpressionNode from './ExpressionNode'
import ThrowNode from './ThrowNode'

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
    let childrenNodes: Array<{shouldAddToTree: boolean, node: Node}> = []
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
      const normalizedNodes = parsedNodes ? (parsedNodes instanceof Array ? parsedNodes : [parsedNodes]) : []

      if (normalizedNodes.length === 0) {
        if (!syntaxNode.isOptional) {
          handleNotMatch()
          return null
        }
      }

      childrenNodes = childrenNodes.concat(normalizedNodes.map(node => ({
        shouldAddToTree: syntaxNode.shouldAddToTree,
        node
      })))
    }

    // update node location info with children info
    if (childrenNodes.length) {
      const firstNode = childrenNodes[0]
      const lastNode = childrenNodes[childrenNodes.length - 1]
      
      node.loc.start = firstNode.node.loc.start
      node.loc.end = lastNode.node.loc.end
    }

    const addToTreeNodes = childrenNodes
      .filter(({ shouldAddToTree }) => shouldAddToTree)
      .map(({ node }) => node)
  
    return node.create(addToTreeNodes)
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
