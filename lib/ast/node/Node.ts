import { ILocation } from "../../lexer/types/location"

class Node {
  loc: {
    start: ILocation,
    end: ILocation
  } = {
    start: null,
    end: null
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
