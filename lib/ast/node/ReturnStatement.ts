import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Environment from '../../runtime/Environment'

class ReturnStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.RETURN_STATEMENT
  argument: Node

  create(children: Array<Node>): Node {
    const argument = children[0]
    this.argument = argument
    return this
  }

  evaluate(env: Environment): any {
    return this.argument.evaluate(env)
  }
}

export default ReturnStatement
