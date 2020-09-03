import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Token from './Token'

class VariableModifier extends Node {
  type: NODE_TYPE = NODE_TYPE.VARIABLE_MODIFIER
  kind: string

  create(children: Array<Node>): Node {
    const token = children[0] as Token
    this.kind = token.token.type
    return this
  }
}

export default VariableModifier
