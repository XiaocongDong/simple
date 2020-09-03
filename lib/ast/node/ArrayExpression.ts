import Node from './Node'
import { NODE_TYPE } from '../types/node'
import ListNode from './ListNode'
import Environment from '../../runtime/Environment'

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

  evaluate(env: Environment): any {
    const result = []
    for (let element of this.elements) {
      result.push(element.evaluate(env))
    }
    return result
  }
}

export default ArrayExpression
