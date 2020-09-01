import Node from './Node'
import { NODE_TYPE } from '../types/node'
import ListNode from './ListNode'

class AccessExpression extends Node {
  type: NODE_TYPE.ACCESS_EXPRESSION
  property: Node

  create(children: Array<Node>): Node {
    const propertyNode = children[0]
    this.property = propertyNode
    this.loc.start = propertyNode.loc.start
    this.loc.end = propertyNode.loc.end
    return this
  }
}

export default AccessExpression
