import Node from './Node'
import { NODE_TYPE } from '../types/node'

class SingleExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.SINGLE_EXPRESSION
}

export default SingleExpression
