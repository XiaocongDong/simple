import Node from './Node'
import { NODE_TYPE } from '../types/node'
import ListNode from './ListNode'
import Environment from '../../runtime/Environment'
import runtime from '../../runtime/runtime'

class ForStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.FOR_STATEMENT
  init: Node
  test: Node
  update: Node
  body: Node

  create(children: Array<Node>): Node {
    const forArguments = children[0] as ListNode
    const bodyStatement = children[1]
    const forArgumentsChildren = forArguments.children
    this.init = forArgumentsChildren[0]
    this.test = forArgumentsChildren[1]
    this.update = forArgumentsChildren[2]
    this.body = bodyStatement
    return this
  }

  evaluate(env: Environment): any {
    const executeEnvironment = new Environment(env)

    runtime.markIterationCallPosition()
    this.init.evaluate(executeEnvironment)
    while(!runtime.isBreak && !runtime.isReturn && this.test.evaluate()) {
      this.body.evaluate(executeEnvironment)
      this.update.evaluate(executeEnvironment)
    }

    runtime.resetIsBreak()
  }
}

export default ForStatement
