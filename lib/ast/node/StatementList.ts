import Node from './Node'
import { NODE_TYPE } from '../types/node'

class StatementList extends Node {
  type: NODE_TYPE = NODE_TYPE.STATEMENT_LIST
  statements: Array<Node> = []

  create(children: Array<Node>): Node {
    this.statements = children
    return this
  }
}

export default StatementList
