import Node from '../node/Node'
import Parser from "./Parser"
import SyntaxNode from "./SyntaxNode"
import TokenBuffer from "../../lexer/TokenBuffer"

class ParserSyntaxNode extends SyntaxNode {
  parser: Parser = null
  constructor(p: Parser) {
    super()
    this.parser = p
  }

  process(tokenBuffer: TokenBuffer): Node {
    return this.parser.parse(tokenBuffer)
  }
}

export default ParserSyntaxNode
