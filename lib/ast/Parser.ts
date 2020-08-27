import TokenBuffer from '../lexer/TokenBuffer'
import Token from './node/Token'
import SyntaxError from '../errors/Syntax'
import { TOKEN_TYPE, IToken } from '../lexer/types/token'
import Node from './node/Node'
import ListNode from './node/ListNode'

enum SyntaxType {
  SEPARATOR = 'SEPARATOR',
  AST = 'AST',
  OPTION = 'OPTION',
  OR = 'OR',
  REPEAT = 'REPEAT',
  TOKEN = 'TOKEN',
  EXPRESSION = 'EXPRESSION',
  THROW = 'THROW'
}

type SyntaxNode = {
  type: SyntaxType.SEPARATOR
  value: TOKEN_TYPE
} | {
  type: SyntaxType.AST,
  value: Parser
} | {
  type: SyntaxType.OPTION,
  value: Parser
} | {
  type: SyntaxType.OR
  value: Array<Parser>
} | {
  type: SyntaxType.REPEAT,
  value: Parser
} | {
  type: SyntaxType.TOKEN,
  value: TOKEN_TYPE
} | {
  type: SyntaxType.THROW,
  value: string
}

class Parser {
  nodes: Array<SyntaxNode> = []
  NodeClass: new () => Node = null

  constructor(NodeClass?: new () => Node) {
    this.NodeClass = NodeClass
  }

  parse(tokenBuffer: TokenBuffer): Node {
    const node = this.NodeClass ? new this.NodeClass() : new ListNode()
    const startCursor = tokenBuffer.getCursor()
    const childrenNodes = []
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

      switch(syntaxNode.type) {
        case SyntaxType.THROW: {
          isCritical = true
          errMsg = syntaxNode.value
          break
        }
        case SyntaxType.SEPARATOR: {
          const token = tokenBuffer.read()
          if (!token || token.type !== syntaxNode.value) {
            handleNotMatch(token)
            return null
          }
          break
        }
        case SyntaxType.AST: {
          const parsedNode = syntaxNode.value.parse(tokenBuffer)
          if (!parsedNode) {
            handleNotMatch()
            return null
          }
          childrenNodes.push(parsedNode)
          break
        }
        case SyntaxType.OPTION: {
          const parsedNode = syntaxNode.value.parse(tokenBuffer)
          if (parsedNode) {
            childrenNodes.push(parsedNode)
          }
          break
        }
        case SyntaxType.OR: {
          let found = false

          for (const parser of syntaxNode.value) {
            const parsedNode = parser.parse(tokenBuffer)
            if (parsedNode) {
              found = true
              childrenNodes.push(parsedNode)
              break
            }
          }
          if (!found) {
            handleNotMatch()
            return null
          }
          break
        }
        case SyntaxType.REPEAT: {
          while(!tokenBuffer.isEmpty()) {
            const parsedNode = syntaxNode.value.parse(tokenBuffer)
            if (parsedNode) {
              childrenNodes.push(parsedNode)
            } else {
              break
            }
          }
          break
        }
        case SyntaxType.TOKEN: {
          const token = tokenBuffer.read()
          if (!token || token.type !== syntaxNode.value) {
            handleNotMatch()
            return null
          }

          const newNode = new Token(token)
          newNode.loc = token.range
          childrenNodes.push(newNode)
          break
        }
        default:
          throw new Error('Unrecognized syntax type')
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
    this.nodes.push({
      type: SyntaxType.SEPARATOR,
      value: sep
    })
    return this
  }

  token(tokenType: TOKEN_TYPE) {
    this.nodes.push({
      type: SyntaxType.TOKEN,
      value: tokenType
    })
    return this
  }

  ast(p: Parser) {
    this.nodes.push({
      type: SyntaxType.AST,
      value: p
    })
    return this
  }

  // bnf []
  option(p: Parser) {
    this.nodes.push({
      type: SyntaxType.OPTION,
      value: p
    })
    return this
  }
  // bnf |
  or(...p: Array<Parser>) {
    this.nodes.push({
      type: SyntaxType.OR,
      value: p
    })
    return this
  }

  // bnf {}
  repeat(p: Parser) {
    this.nodes.push({
      type: SyntaxType.REPEAT,
      value: p
    })
    return this
  }

  throw(errMsg: string) {
    this.nodes.push({
      type: SyntaxType.THROW,
      value: errMsg
    })
    return this
  }
}

export default Parser
