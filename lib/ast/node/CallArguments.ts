import Node from './Node'
import { NODE_TYPE } from '../types/node'
import ListNode from './ListNode'

class CallArguments extends Node {
  type: NODE_TYPE = NODE_TYPE.CALL_ARGUMENTS
  arguments: Array<Node> = []

  create(children: Array<Node>): Node {
    this.arguments = children.length ? (
      children[0] instanceof ListNode ? (<ListNode>children[0]).children
      : [children[0]]
    ) : []
    return this
  }
}

export default CallArguments
