import Node from './Node'
import { NODE_TYPE } from '../types/node'
import FunctionParams from './FunctionParams'
import Environment from '../../runtime/Environment'

class FunctionExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.FUNCTION_EXPRESSION
  params: Array<Node> = []
  body: Node
  parentEnv: Environment

  create(children: Array<Node>): Node {
    const params = children[0]
    if (params instanceof FunctionParams) {
      this.params = params.params
      this.body = children[1]
    } else {
      this.body = params
    }
    return this
  }

  evaluate(env: Environment): any {
    this.parentEnv = env
    return this
  }
}

export default FunctionExpression
