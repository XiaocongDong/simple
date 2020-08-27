import ListNode from './ListNode'
import { NODE_TYPE } from '../types/node'

class BlockStatement extends ListNode {
  type: NODE_TYPE = NODE_TYPE.BLOCK_STATEMENT
}

export default BlockStatement
