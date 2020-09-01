import Node from './Node'
import { NODE_TYPE } from '../types/node'

class MemberAccessTailer extends Node {
  type: NODE_TYPE = NODE_TYPE.MEMBER_ACCESS_TAILER
  property: Node

  create(children: Array<Node>): Node {
    this.property = children[0]
    return this
  }
}

export default MemberAccessTailer
