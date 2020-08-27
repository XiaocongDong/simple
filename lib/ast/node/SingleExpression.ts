import Node from './Node'
import { NODE_TYPE } from '../types/node'
import ListNode from './ListNode'

class SingleExpression extends ListNode {
  type: NODE_TYPE = NODE_TYPE.SINGLE_EXPRESSION
}

export default SingleExpression
