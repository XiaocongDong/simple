import Node from './Node'
import { NODE_TYPE } from '../types/node'

class VariableModifier extends Node {
  type: NODE_TYPE = NODE_TYPE.VARIABLE_MODIFIER
}

export default VariableModifier
