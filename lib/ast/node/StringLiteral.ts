import Node from "./Node";
import { NODE_TYPE } from "../types/node";
import Token from "./Token";

class StringLiteral extends Node {
  type: NODE_TYPE = NODE_TYPE.STRING_LITERAL
  value: string

  create(children: Array<Node>): Node {
    const tokenNode = children[0] as Token
    const token = tokenNode.token
    this.value = token.value.replace(/'/g, '')
    return this
  }

  evaluate(): any {
    return this.value
  }
}

export default StringLiteral
