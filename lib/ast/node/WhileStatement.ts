import Node from './Node'
import { NODE_TYPE } from '../types/node'

class WhileStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.WHILE_STATEMENT
  test: Node = null
  body: Node = null

  create(children: Array<Node>): Node {
    this.test = children[0]
    this.body = children[1]
    return this
  }
}

export default WhileStatement
