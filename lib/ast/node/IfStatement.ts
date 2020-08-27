import Node from './Node'
import BlockStatement from './BlockStatement'
import SingleExpression from './SingleExpression'
import { NODE_TYPE } from '../types/node'

class IfStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.BOOLEAN_LITERAL
  test: SingleExpression = null
  consequent: BlockStatement = null

  create(children: Array<Node>): Node {
    this.test = children[0] as SingleExpression
    this.consequent = children[1] as BlockStatement
    return this
  }
}

export default IfStatement
