import Node from './Node'
import SingleExpression from './SingleExpression'
import { NODE_TYPE } from '../types/node'
import Token from './Token'
import ListNode from './ListNode'

class VariableDeclarator extends Node {
  type: NODE_TYPE = NODE_TYPE.VARIABLE_DECLARATOR
  id: string
  init: SingleExpression

  create(children: Array<Node>): Node {
    const identifier = children[0] as Token
    const initialExpression = children[1] as ListNode

    this.id = identifier.token.value
    if (initialExpression) {
      this.init = initialExpression.children[1] as SingleExpression
    }

    return this
  }
}

export default VariableDeclarator
