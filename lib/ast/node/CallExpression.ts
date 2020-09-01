import Node from './Node'
import { NODE_TYPE } from '../types/node'

class CallExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.CALL_EXPRESSION
  callee: Node
  arguments: Array<Node>
}

export default CallExpression
