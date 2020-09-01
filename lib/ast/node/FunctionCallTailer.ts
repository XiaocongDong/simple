import Node from './Node'
import { NODE_TYPE } from '../types/node'
import CallArguments from './CallArguments'

class FunctionCallTailer extends Node {
  type: NODE_TYPE = NODE_TYPE.FUNCTION_CALL_TAILER
  arguments: Array<Node> = []

  create(children: Array<Node>): Node {
    const argumentsNode = children[0] as CallArguments
    this.arguments = argumentsNode.arguments
    return this
  }
}

export default FunctionCallTailer
