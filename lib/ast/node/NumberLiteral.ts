import Node from "./Node";
import { NODE_TYPE } from "../types/node";
import Token from "./Token";

class NumberLiteral extends Node {
  type: NODE_TYPE = NODE_TYPE.NUMBER_LITERAL
  value: number

  create(children: Array<Node>): Node {
    const token = children[0] as Token
    this.value = parseInt(token.token.value)
    return this
  }

  evaluate(): any {
    return this.value
  }
}

export default NumberLiteral
