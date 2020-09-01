import Node from './Node'
import { NODE_TYPE } from '../types/node'

class FunctionParams extends Node {
  type: NODE_TYPE.FUNCTION_PARAMS
  params: Array<Node>

  create(children: Array<Node>): Node {
    this.params = children
    return this
  }
}

export default FunctionParams
