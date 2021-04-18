import Node from './Node'
import BlockStatement from './BlockStatement'
import { NODE_TYPE } from '../types/node'
import Environment from '../../runtime/Environment'
import BinaryExpression from './BinaryExpression'

class IfStatement extends Node {
  type: NODE_TYPE = NODE_TYPE.IF_STATEMENT
  test: BinaryExpression = null
  consequent: BlockStatement = null
  alternate: IfStatement|BlockStatement = null

  create(children: Array<Node>): Node {
    this.test = children[0] as BinaryExpression
    this.consequent = children[1] as BlockStatement
    this.alternate = children[2] as IfStatement|BlockStatement
    return this
  }

  evaluate(env: Environment): any {
    if (this.test.evaluate(env)) {
      const executionEnvironment = new Environment(env)
      this.consequent.evaluate(executionEnvironment)
    } else if (this.alternate) {
      if (this.alternate instanceof BlockStatement) {
        const executionEnvironment = new Environment(env)
        this.alternate.evaluate(executionEnvironment)
      } else {
        this.alternate.evaluate(env)
      }
    }
  }
}

export default IfStatement
