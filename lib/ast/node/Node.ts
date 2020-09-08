import { ILocation } from "../../lexer/types/location"
import Environment from "../../runtime/Environment"
import { NODE_TYPE } from "../types/node"

class Node {
  type: NODE_TYPE
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
