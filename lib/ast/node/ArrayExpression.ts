import Node from './Node'
import { NODE_TYPE } from '../types/node'
import ListNode from './ListNode'

class ArrayExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.ARRAY_EXPRESSION
  elements: Array<Node> = []

  create(children: Array<Node>): Node {
    if (children.length) {
      const elements = children[0]
      this.elements = elements instanceof ListNode ? elements.children : [elements]
    }
    return this
  }
}

export default ArrayExpression
