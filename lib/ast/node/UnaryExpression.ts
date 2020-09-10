import Node from './Node'
import { NODE_TYPE } from '../types/node'
import { TOKEN_TYPE } from '../../lexer/types/token'
import Environment from '../../runtime/Environment'
import Token from './Token'

class UnaryExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.UNARY_EXPRESSION
  operator: TOKEN_TYPE
  argument: Node

  create(children: Array<Node>) {
    const operatorToken = children[0] as Token
    this.operator = operatorToken.token.type
    this.argument = children[1]

    return this
  }

  evaluate(env: Environment): any {
    switch(this.operator) {
      case TOKEN_TYPE.NOT:
        return !(this.argument.evaluate(env))
      default:
        throw new Error(`unrecognized operator ${this.operator} in UnaryExpression`)
    }
  }
}

export default UnaryExpression
