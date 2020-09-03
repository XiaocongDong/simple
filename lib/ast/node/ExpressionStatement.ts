import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Environment from '../../runtime/Environment'

class ExpressionStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.EXPRESSION_STATEMENT
  expression: Node

  create(children: Array<Node>): Node {
    this.expression = children[0]
    return this
  }

  evaluate(env: Environment): any {
    return this.expression.evaluate(env)
  }
}

export default ExpressionStatement
