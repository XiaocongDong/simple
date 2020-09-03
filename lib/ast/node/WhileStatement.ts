import Node from './Node'
import { NODE_TYPE } from '../types/node'
import BinaryExpression from './BinaryExpression'
import BlockStatement from './BlockStatement'

class WhileStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.WHILE_STATEMENT
  test: BinaryExpression = null
  body: BlockStatement = null

  create(children: Array<Node>): Node {
    this.test = children[0] as BinaryExpression
    this.body = children[1] as BlockStatement
    return this
  }
}

export default WhileStatement
