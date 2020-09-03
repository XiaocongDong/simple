import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Environment from '../../runtime/Environment'
import runtime from '../../runtime/runtime'

class StatementList extends Node {
  type: NODE_TYPE = NODE_TYPE.STATEMENT_LIST
  statements: Array<Node> = []

  create(children: Array<Node>): Node {
    this.statements = children
    return this
  }

  evaluate(env: Environment): any {
    // add statement in inverted order
    for(let i = 0; i < this.statements.length; i++) {
      runtime.callStack.add(env, this.statements[i])
      if (runtime.isReturn || runtime.isBreak) {
        break
      }
      runtime.resume()
    }
  }
}

export default StatementList
