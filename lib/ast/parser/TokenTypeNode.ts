import Node from '../node/Node'
import SyntaxNode from "./SyntaxNode"
import { TOKEN_TYPE } from "../../lexer/types/token"
import Token from "../node/Token"

class TokenTypeNode extends SyntaxNode {
  isOptional
  tokenType: TOKEN_TYPE = null
  constructor(tokenType: TOKEN_TYPE) {
    super()
    this.tokenType = tokenType
  }

  process(tokenBuffer): Node {
    const token = tokenBuffer.read()
    if (!token || token.type !== this.tokenType) {
      return null
    }

    const newNode = new Token(token)
    newNode.loc = token.range
    return newNode as Node
  }
}

export default TokenTypeNode
