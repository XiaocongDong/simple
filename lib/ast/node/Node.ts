import { ILocation } from "../../lexer/types/location"

class Node {
  children: Array<Node> = []
  loc: {
    start: ILocation,
    end: ILocation
  } = {
    start: null,
    end: null
  }

  addChildren(node: Node) {
    this.children.push(node)
  }

  create(children: Array<Node>): Node {
    if (children.length === 1) {
      return children[0]
    } else {
      return this
    }
  }
}

export default Node
