import Node from '../node/Node'
import SyntaxNode from "./SyntaxNode"

class ThrowNode extends SyntaxNode {
  errMsg: string = null
  constructor(errMsg: string) {
    super()
    this.errMsg = errMsg
  }

  process(tokenBuffer): Node {
    return null
  }
}

export default ThrowNode
