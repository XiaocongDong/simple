import Node from '../node/Node'
import SyntaxNode from "./SyntaxNode"
import Parser from "./Parser"

class OrNode extends SyntaxNode {
  parsers: Array<Parser>
  constructor(...ps: Array<Parser>) {
    super()
    this.parsers = ps
  }

  process(tokenBuffer): Node {
    for (const parser of this.parsers) {
      const parsedNode = parser.parse(tokenBuffer)
      if (parsedNode) {
        return parsedNode
      }
    }
  }
}

export default OrNode
