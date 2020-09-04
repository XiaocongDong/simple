import Node from './Node'
import { NODE_TYPE } from '../types/node'

class BreakStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.BREAK_STATEMENT

  evaluate(): any {
    return
  }
}

export default BreakStatement
