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
    runtime.markFunctionCallPosition()

    let functionNode: FunctionDeclaration|FunctionExpression = null
    try {
      functionNode = env.get(this.callee.name) as FunctionDeclaration|FunctionExpression
    } catch(e) {
      throw new RuntimeError(e.message, this.callee.loc.start)
    }

    try {
      functionNode.call(this.arguments)
    } catch(e) {
      throw new RuntimeError(e.message, this.callee.loc.start)
    }

    const result = runtime.getLastFunctionExecutionResult()
    runtime.resetLastFunctionExecutionResult()

    return result
  }
}

export default CallExpression
