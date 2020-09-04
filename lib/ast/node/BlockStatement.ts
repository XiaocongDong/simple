import Node from './Node'
import { NODE_TYPE } from '../types/node'
import StatementList from './StatementList'
import Environment from '../../runtime/Environment'

class BlockStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.BLOCK_STATEMENT
  body: StatementList

  create(children: Array<Node>): Node {
    const statementList = children[0] as StatementList
    this.body = statementList
    return this
  }

  evaluate(env: Environment): any {
    this.body.evaluate(env)
  }
}

export default BlockStatement
