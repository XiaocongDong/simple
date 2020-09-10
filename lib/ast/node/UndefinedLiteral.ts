import Node from './Node'
import { NODE_TYPE } from '../types/node'

class UndefinedLiteral extends Node {
  type: NODE_TYPE = NODE_TYPE.UNDEFINED_LITERAL
  
  create(children: Array<Node>): Node {
    return this
  }

  evaluate(): any {
    return undefined
  }
}

export default UndefinedLiteral
