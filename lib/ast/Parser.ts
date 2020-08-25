import TokenBuffer from '../lexer/TokenBuffer'
import Token from './node/Token'
import SyntaxError from '../errors/Syntax'
import { TOKEN_TYPE, IToken } from '../lexer/types/token'
import Node from './node/Node'
import { ILocation } from '../lexer/types/location'

enum SyntaxType {
  SEPARATOR = 'SEPARATOR',
  AST = 'AST',
  OPTION = 'OPTION',
  OR = 'OR',
  REPEAT = 'REPEAT',
  TOKEN = 'TOKEN'
}

type SyntaxNode = {
  type: SyntaxType.SEPARATOR
  value: string
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
}

class Parser {
  nodes: Array<SyntaxNode> = []
  NodeClass: new () => Node = null

  constructor(NodeClass?: new () => Node) {
    this.NodeClass = NodeClass
  }

  parse(tokenBuffer: TokenBuffer): Node {
    const node = this.NodeClass ? new this.NodeClass() : new Node()
    const currentCursor = tokenBuffer.getCursor()

    for (let i = 0; i < this.nodes.length; i++) {
      const syntaxNode = this.nodes[i]

      switch(syntaxNode.type) {
        case SyntaxType.SEPARATOR: {
          const token = tokenBuffer.read()
          if (!token || token.value !== syntaxNode.value) {
            tokenBuffer.setCursor(currentCursor)
            return null
          }
          break
        }
        case SyntaxType.AST: {
          const parsedNode = syntaxNode.value.parse(tokenBuffer)
          if (!parsedNode) {
            tokenBuffer.setCursor(currentCursor)
            return null
          }
          node.addChildren(parsedNode)
          break
        }
        case SyntaxType.OPTION: {
          const parsedNode = syntaxNode.value.parse(tokenBuffer)
          if (parsedNode) {
            node.addChildren(parsedNode)
          }
          break
        }
        case SyntaxType.OR: {
          let found = false
          for (const parser of syntaxNode.value) {
            const parsedNode = parser.parse(tokenBuffer)
            if (parsedNode) {
              found = true
              node.addChildren(parsedNode)
              break
            }
          }
          if (!found) {
            tokenBuffer.setCursor(currentCursor)
            return null
          }
          break
        }
        case SyntaxType.REPEAT: {
          while(true) {
            const parsedNode = syntaxNode.value.parse(tokenBuffer)
            if (parsedNode) {
              node.addChildren(parsedNode)
            } else {
              break
            }
          }
          break
        }
        case SyntaxType.TOKEN: {
          const token = tokenBuffer.read()
          if (!token || token.type !== syntaxNode.value) {
            tokenBuffer.setCursor(currentCursor)
            return null
          }
          const newNode = new Token(token)
          newNode.loc = token.range
          node.addChildren(newNode)
          break
        }
        default:
          throw new Error('Unrecognized syntax type')
      }
    }

    if (node.children.length) {
      const firstNode = node.children[0]
      const lastNode = node.children[node.children.length - 1]
      
      node.loc.start = firstNode.loc.start
      node.loc.end = lastNode.loc.end
    }

    return node.create(node.children)
  }

  separator(sep: string) {
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
}

export default Parser
