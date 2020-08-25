import Node from './Node'
import { NODE_TYPE } from '../types/node'
import VariableDeclarator from './VariableDeclarator'

class VariableStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.VARIABLE_STATEMENT
  declarations: Array<Node> = []

  create(children: Array<Node>): Node {
    this.declarations = children
    return this
  }
}

export default VariableStatement
