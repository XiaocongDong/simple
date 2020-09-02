import Node from './Node'
import { NODE_TYPE } from '../types/node'
import { TOKEN_TYPE } from '../../lexer/types/token'
import Token from '../node/Token'

class UpdateExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.UPDATE_EXPRESSION
  operator: TOKEN_TYPE
  prefix: boolean
  argument: Node

  create(children: Array<Node>): Node {
    const firstNode = children[0]
    const secondNode = children[1]
    if (firstNode instanceof Token) {
      this.prefix = true
      this.operator = (<Token>firstNode).token.type
      this.argument = secondNode
    } else {
      this.prefix = false
      this.operator = (<Token>secondNode).token.type
      this.argument = firstNode
    }

    return this
  }
}

export default UpdateExpression
