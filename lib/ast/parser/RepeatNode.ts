import Node from '../node/Node'
import SyntaxNode from "./SyntaxNode"
import Parser from "../Parser"

class RepeatNode extends SyntaxNode {
  isOptional = true
  parser: Parser = null
  constructor(p: Parser) {
    super()
    this.parser = p
  }
  
  process(tokenBuffer): Array<Node> {
    const childrenNodes: Array<Node> = []
    while(!tokenBuffer.isEmpty()) {
      const parsedNode = this.parser.parse(tokenBuffer)
      if (parsedNode) {
        childrenNodes.push(parsedNode)
        continue
      } else {
        break
      }
    }
    return childrenNodes
  }
}

export default RepeatNode
