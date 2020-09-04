import Node from './Node'
import { NODE_TYPE } from '../types/node'
import FunctionParams from './FunctionParams'
import Environment from '../../runtime/Environment'
import Identifier from './Identifier'
import BlockStatement from './BlockStatement'

class FunctionExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.FUNCTION_EXPRESSION
  params: Array<Identifier> = []
  body: BlockStatement
  parentEnv: Environment

  create(children: Array<Node>): Node {
    const params = children[0]
    if (params instanceof FunctionParams) {
      this.params = params.params
      this.body = children[1] as BlockStatement
    } else {
      this.body = params as BlockStatement
    }
    return this
  }

  evaluate(env: Environment): any {
    this.parentEnv = env
    return this
  }

  call(args: Array<any>): any {
    if (this.params.length !== args.length) {
      throw new Error('function declared parameters are not matched with arguments')
    }

    const callEnvironment = new Environment(this.parentEnv)
    // initialize environments with args
    for (let i = 0; i < args.length; i++) {
      const argument = args[i]
      const param = this.params[i]

      callEnvironment.create(param.name, argument)
    }

    this.body.evaluate(callEnvironment)
  }
}

export default FunctionExpression
