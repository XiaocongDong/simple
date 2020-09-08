import Node from "../ast/node/Node"
import Environment from './Environment'
import ExpressionStatement from "../ast/node/ExpressionStatement"
import { NODE_TYPE } from "../ast/types/node"

class CallStack {
  stacks: Array<{environment: Environment, statement: Node}> = []
  cursor: number = -1

  add(environment: Environment, statement: Node) {
    this.cursor++
    this.stacks[this.cursor] = { environment, statement }
  }

  peek(): {environment: Environment, statement: Node} {
    return this.stacks[this.cursor]
  }

  pop(): {environment: Environment, statement: Node} {
    const value = this.peek()
    this.cursor = this.cursor - 1
    return value
  }

  private _isCallExpression(statement: Node): boolean {
    return statement.type === NODE_TYPE.EXPRESSION_STATEMENT &&  (<ExpressionStatement>statement).expression.type === NODE_TYPE.CALL_EXPRESSION
  }

  checkIfCanReturn(): boolean {
    let canReturn = false

    for (let i = this.cursor; i >= 0; i--) {
      if (this._isCallExpression(this.stacks[i].statement)) {
        canReturn = true
        break
      }
    }

    return canReturn
  }

  checkIfCanBreak(): boolean {
    let canBreak = false

    for (let i = this.cursor; i >= 0; i--) {
      if (this._isCallExpression(this.stacks[i].statement)) {
        break
      }

      if (this.stacks[i].statement.type === NODE_TYPE.WHILE_STATEMENT || this.stacks[i].statement.type === NODE_TYPE.FOR_STATEMENT) {
        canBreak = true
        break
      }
    }

    return canBreak
  }

  setCursor(cursor: number) {
    if (cursor > this.cursor) {
      throw new Error('call stack cursor can not go back!')
    }
    this.cursor = cursor
  }

  getCursor(): number {
    return this.cursor
  }

  isEmpty(): boolean {
    return this.cursor === -1
  }
}

export default CallStack
