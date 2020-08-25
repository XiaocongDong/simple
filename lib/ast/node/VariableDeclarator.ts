import Node from './Node'
import SingleExpression from './SingleExpression'
import { NODE_TYPE } from '../types/node'
import { IToken } from '../../lexer/types/token'
import Token from './Token'

class VariableDeclarator extends Node {
  type: NODE_TYPE = NODE_TYPE.VARIABLE_DECLARATOR
  id: string
  init: SingleExpression

  create(children: Array<Node>): Node {
    const identifier = children[0] as Token
    const initialExpression = children[1] as SingleExpression

    this.id = identifier.token.value
    if (initialExpression) {
      this.init = initialExpression
    }

    return this
  }
}

export default VariableDeclarator
