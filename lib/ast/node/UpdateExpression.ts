import Node from './Node'
import { NODE_TYPE } from '../types/node'
import { TOKEN_TYPE } from '../../lexer/types/token'
import Token from '../node/Token'
import Environment from '../../runtime/Environment'
import Identifier from './Identifier'
import RuntimeError from '../../errors/Runtime'

class UpdateExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.UPDATE_EXPRESSION
  operator: TOKEN_TYPE
  prefix: boolean
  argument: Identifier

  create(children: Array<Node>): Node {
    const firstNode = children[0]
    const secondNode = children[1]
    if (firstNode instanceof Token) {
      this.prefix = true
      this.operator = (<Token>firstNode).token.type
      this.argument = secondNode as Identifier
    } else {
      this.prefix = false
      this.operator = (<Token>secondNode).token.type
      this.argument = firstNode as Identifier
    }

    return this
  }

  evaluate(env: Environment): any {
    let currentValue
    try {
      currentValue = this.argument.evaluate(env)
    } catch(e) {
      throw new RuntimeError(e.message, this.argument.loc.start)
    }
    if (typeof currentValue !== 'number') {
      throw new RuntimeError('Update expression only work on number', this.argument.loc.start)
    }

    let nextValue = currentValue

    switch(this.operator) {
      case TOKEN_TYPE.PLUS_PLUS:
        nextValue += 1
        break
      case TOKEN_TYPE.MINUS_MINUS:
        nextValue -= 1
        break
      default:
        throw Error(`Unrecognized operator ${this.operator}`)
    }

    env.set(this.argument.name, nextValue)
    return this.prefix ? nextValue : currentValue
  }
}

export default UpdateExpression
