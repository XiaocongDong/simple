import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Environment from '../../runtime/Environment'
import runtime from '../../runtime/runtime'
import Identifier from './Identifier'
import FunctionDeclaration from './FunctionDeclaration'
import FunctionExpression from './FunctionExpression'
import RuntimeError from '../../errors/Runtime'
import MemberExpression from './MemberExpression'

class CallExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.CALL_EXPRESSION
  callee: Identifier|MemberExpression
  arguments: Array<Node>

  evaluate(env: Environment): any {
    let functionNode: FunctionDeclaration|FunctionExpression = null

    functionNode = this.callee.evaluate(env)

    const args = []
    for(let argument of this.arguments) {
      args.push(argument.evaluate(env))
    }

    // execute native functions
    if (typeof functionNode === 'function') {
      return (<Function>functionNode)(...args)
    }

    runtime.markFunctionCallPosition()

    // execute user defined function
    try {
      functionNode.call(args, this.callee instanceof MemberExpression ? this.callee.object.evaluate(env) : undefined)
    } catch(e) {
      throw new RuntimeError(e.message, this.callee.loc.start)
    }

    const result = runtime.getLastFunctionExecutionResult()
    runtime.resetLastFunctionExecutionResult()

    return result
  }
}

export default CallExpression
