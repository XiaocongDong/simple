import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Token from './Token'

class Identifier extends Node {
  type: NODE_TYPE.IDENTIFIER
  name: string

  create(children: Array<Node>): Node {
    const token = children[0] as Token
    this.name = token.token.value
    return this
  }
}

export default Identifier
