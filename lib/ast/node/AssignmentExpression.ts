import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Identifier from './Identifier'
import MemberExpression from './MemberExpression'
import RuntimeError from '../../errors/Runtime'
import SyntaxError from '../../errors/Syntax'
import Environment from '../../runtime/Environment'
import { TOKEN_TYPE } from '../../lexer/types/token'
import Token from './Token'

class AssignmentExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.ASSIGNMENT_EXPRESSION
  left: Node = null
  right: Node = null
  assignType: TOKEN_TYPE

  create(children: Array<Node>): Node {
    this.left = children[0]
    this.assignType = (children[1] as Token).token.type
    this.right = children[2]

    if (!(this.left instanceof Identifier) && !(this.left instanceof MemberExpression)) {
      throw new SyntaxError('left-hand must be identifer or member access expression', this.left.loc.start)
    }

    return this
  }

  evaluate(env: Environment): any {
    if (this.left instanceof Identifier) {
      const rightValue = this.right.evaluate(env)
      switch (this.assignType) {
        case TOKEN_TYPE.ASSIGN:
          env.update(this.left.name, rightValue)
          break
        case TOKEN_TYPE.PLUS_ASSIGN:
          env.update(this.left.name, this.left.evaluate(env) + rightValue)
          break
        case TOKEN_TYPE.MINUS_ASSIGN:
          env.update(this.left.name, this.left.evaluate(env) - rightValue)
        default:
          break;
      }
    } else if (this.left instanceof MemberExpression) {
      const value = this.left.object.evaluate()

      try {
        switch(this.assignType) {
          case TOKEN_TYPE.ASSIGN:
            value[this.left.property.evaluate(env)] = this.right.evaluate(env)
            break
          case TOKEN_TYPE.PLUS_ASSIGN:
            value[this.left.property.evaluate(env)] += this.right.evaluate(env)
            break
          case TOKEN_TYPE.MINUS_ASSIGN:
            value[this.left.property.evaluate(env)] -= this.right.evaluate(env)
            break
        }
      } catch(e) {
        throw new RuntimeError(e.message, this.left.loc.start)
      }
    }
  }
}

export default AssignmentExpression
