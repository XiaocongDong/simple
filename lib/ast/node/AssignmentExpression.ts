import Node from './Node'
import { NODE_TYPE } from '../types/node'

class AssignmentExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.ASSIGNMENT_EXPRESSION
  left: Node = null
  right: Node = null

  create(children: Array<Node>): Node {
    this.left = children[0]
    this.right = children[1]
    return this
  }
}

export default AssignmentExpression
