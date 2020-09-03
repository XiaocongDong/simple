import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Identifier from './Identifier'
import MemberExpression from './MemberExpression'
import RuntimeError from '../../errors/Runtime'
import SyntaxError from '../../errors/Syntax'
import Environment from '../../runtime/Environment'

class AssignmentExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.ASSIGNMENT_EXPRESSION
  left: Node = null
  right: Node = null

  create(children: Array<Node>): Node {
    this.left = children[0]
    this.right = children[1]

    if (!(this.left instanceof Identifier) && !(this.left instanceof MemberExpression)) {
      throw new SyntaxError('left-hand must be identifer or member access expression', this.left.loc.start)
    }

    return this
  }

  evaluate(env: Environment): any {
    if (this.left instanceof Identifier) {
      env.set(this.left.name, this.right.evaluate(env), false)
    } else if (this.left instanceof MemberExpression) {
      const value = this.left.object.evaluate()

      try {
        value[this.left.property.evaluate(env)] = this.right.evaluate(env)
      } catch(e) {
        throw new RuntimeError(e.message, this.left.loc.start)
      }
    }
  }
}

export default AssignmentExpression
