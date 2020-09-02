import { ILocation } from "../../lexer/types/location"
import Environment from "../../runtime/Environment"

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

  evaluate(env?: Environment): any {
    throw new Error('Child Class must implement its evaluate method')
  }
}

export default Node
