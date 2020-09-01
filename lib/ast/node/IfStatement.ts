import Node from './Node'
import BlockStatement from './BlockStatement'
import { NODE_TYPE } from '../types/node'

class IfStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.BOOLEAN_LITERAL
  test: Node = null
  consequent: BlockStatement = null

  create(children: Array<Node>): Node {
    this.test = children[0]
    this.consequent = children[1] as BlockStatement
    return this
  }
}

export default IfStatement
