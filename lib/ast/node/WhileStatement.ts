import Node from './Node'
import { NODE_TYPE } from '../types/node'
import BinaryExpression from './BinaryExpression'
import BlockStatement from './BlockStatement'
import Environment from '../../runtime/Environment'
import runtime from '../../runtime/runtime'

class WhileStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.WHILE_STATEMENT
  test: BinaryExpression = null
  body: BlockStatement = null

  create(children: Array<Node>): Node {
    this.test = children[0] as BinaryExpression
    this.body = children[1] as BlockStatement
    return this
  }

  evaluate(env: Environment): any {
    const bridgeEnvironment = new Environment(env)
    runtime.markIterationCallPosition()
    
    while(!runtime.isReturn && !runtime.isBreak && this.test.evaluate(bridgeEnvironment)) {
      const executionEnvironment = new Environment(bridgeEnvironment)
      this.body.evaluate(executionEnvironment)
    }
    runtime.resetIsBreak()
  }
}

export default WhileStatement
