import Node from './Node'
import { NODE_TYPE } from '../types/node'
import ListNode from './ListNode'
import VariableModifier from './VariableModifier'
import VariableDeclarator from './VariableDeclarator'

class VariableStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.VARIABLE_STATEMENT
  kind: string
  declarations: Array<VariableDeclarator> = []

  create(children: Array<Node>): Node {
    const modifier = children[0] as VariableModifier
    this.kind = modifier.kind
    this.declarations = [children[1] as VariableDeclarator]
    return this
  }
}

export default VariableStatement
