import TokenBuffer from "../../lexer/TokenBuffer"
import Node from '../node/Node'

abstract class SyntaxNode {
  shouldAddToTree: boolean = true
  isOptional: boolean = false
  abstract process(tokenBuffer: TokenBuffer): Node|Array<Node>
}

export default SyntaxNode
