import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Environment from '../../runtime/Environment'

class StatementList extends Node {
  type: NODE_TYPE = NODE_TYPE.STATEMENT_LIST
  statements: Array<Node> = []

  create(children: Array<Node>): Node {
    this.statements = children
    return this
  }

  evaluate(parentEnv?: Environment): any {
    this.statements.forEach(statement => statement.evaluate(parentEnv))
  }
}

export default StatementList
