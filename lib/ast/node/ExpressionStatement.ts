import Node from './Node'
import { NODE_TYPE } from '../types/node'

class ExpressionStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.EXPRESSION_STATEMENT
  expression: Node

  create(children: Array<Node>): Node {
    this.expression = children[0]
    return this
  }
}

export default ExpressionStatement
