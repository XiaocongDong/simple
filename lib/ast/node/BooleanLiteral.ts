import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Token from './Token'
import { TOKEN_TYPE } from '../../lexer/types/token'

class BooleanLiteral extends Node {
  type: NODE_TYPE = NODE_TYPE.BOOLEAN_LITERAL
  value: boolean

  create(children: Array<Node>): Node {
    const token = children[0] as Token
    this.value = token.token.type === TOKEN_TYPE.FALSE ? false : true
    return this
  }

  evaluate(): any {
    return this.value
  }
}

export default BooleanLiteral
