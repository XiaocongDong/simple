import Node from './Node'
import { NODE_TYPE } from '../types/node'
import StatementList from './StatementList'

class BlockStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.BLOCK_STATEMENT
  body: Array<Node>

  create(children: Array<Node>): Node {
    const statementList = children[0] as StatementList
    this.body = statementList.statements
    return this
  }
}

export default BlockStatement
