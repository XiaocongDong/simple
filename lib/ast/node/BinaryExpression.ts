import Node from './Node'
import { NODE_TYPE } from '../types/node'
import { TOKEN_TYPE } from '../../lexer/types/token'
import Environment from '../../runtime/Environment'
import RuntimeError from '../../errors/Runtime'

const numberOperators = [
  TOKEN_TYPE.LESS_THAN,
  TOKEN_TYPE.LESS_EQUAL_THAN,
  TOKEN_TYPE.GREATER_EQUAL_THAN,
  TOKEN_TYPE.GREATER_THAN,
  TOKEN_TYPE.PLUS,
  TOKEN_TYPE.MINUS,
  TOKEN_TYPE.MULTIPLY,
  TOKEN_TYPE.DIVIDE
]
class BinaryExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.BINARY_EXPRESSION
  left: Node
  right: Node
  operator: TOKEN_TYPE

  create(children: Array<Node>): Node {
    return children[0]
  }

  evaluate(env?: Environment): any {
    const leftValue = this.left.evaluate(env)
    const rightValue = this.right.evaluate(env)

    if (numberOperators.includes(this.operator)) {
      if (typeof leftValue !== 'number') {
        throw new RuntimeError('left hand operator must be a valid number', this.left.loc.start)
      }

      if (typeof rightValue !== 'number') {
        throw new RuntimeError('right hand operator must be a valid number', this.right.loc.end)
      }
    }

    switch (this.operator) {
      case TOKEN_TYPE.EQUAL: 
        return leftValue == rightValue
      case TOKEN_TYPE.LESS_THAN:
        return leftValue < rightValue
      case TOKEN_TYPE.LESS_EQUAL_THAN:
        return leftValue <= rightValue
      case TOKEN_TYPE.GREATER_THAN:
        return leftValue > rightValue
      case TOKEN_TYPE.GREATER_EQUAL_THAN:
        return leftValue >= rightValue
      case TOKEN_TYPE.PLUS:
        return leftValue + rightValue
      case TOKEN_TYPE.MINUS:
        return leftValue - rightValue
      case TOKEN_TYPE.MULTIPLY:
        return leftValue * rightValue
      case TOKEN_TYPE.DIVIDE:
        return leftValue / rightValue
    }
  }
}

export default BinaryExpression
