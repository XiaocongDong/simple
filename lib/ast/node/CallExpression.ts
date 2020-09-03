import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Environment from '../../runtime/Environment'
import runtime from '../../runtime/runtime'
import Identifier from './Identifier'
import FunctionDeclaration from './FunctionDeclaration'
import FunctionExpression from './FunctionExpression'
import RuntimeError from '../../errors/Runtime'

class CallExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.CALL_EXPRESSION
  callee: Identifier
  arguments: Array<Node>

  evaluate(env: Environment): any {
    runtime.markFunctionCall()

    const functionNode = env.get(this.callee.name) as FunctionDeclaration|FunctionExpression
    const environment = new Environment(env)
    
    if (functionNode.params.length !== this.arguments.length) {
      throw new RuntimeError('function declared parameters are not matched with arguments', this.callee.loc.end)
    }

    // initialize environments with arguments
    for (let i = 0; i < this.arguments.length; i++) {
      const argument = this.arguments[i]
      const param = functionNode.params[i]

      environment.create(param.name, argument.evaluate())
    }

    functionNode.body.evaluate(environment)

    const result = runtime.getLastFunctionExecutionResult()
    
    runtime.resetLastFunctionExecutionResult()

    return result
  }
}

export default CallExpression
