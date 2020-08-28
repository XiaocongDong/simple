import Node from './Node'
import { NODE_TYPE } from '../types/node'
import { TOKEN_TYPE } from '../../lexer/types/token'

class BinaryExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.BINARY_EXPRESSION
  left: Node
  right: Node
  operator: TOKEN_TYPE

  create(children: Array<Node>): Node {
    return children[0]
  }
}

export default BinaryExpression
