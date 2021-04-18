import Node from './Node'
import { NODE_TYPE } from '../types/node'

class NullLiteral extends Node {
  type: NODE_TYPE = NODE_TYPE.NULL_LITERAL
  
  create() {
    return this
  }

  evaluate(): any {
    return null
  }
}

export default NullLiteral
