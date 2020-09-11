import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Identifier from './Identifier'

class FunctionParams extends Node {
  type: NODE_TYPE = NODE_TYPE.FUNCTION_PARAMS
  params: Array<Identifier>

  create(children: Array<Node>): Node {
    this.params = children as Array<Identifier>
    return this
  }
}

export default FunctionParams
