import Node from "../ast/node/Node"
import Environment from './Environment'

class CallStack {
  stacks: Array<{environment: Environment, statement: Node}> = []
  cursor: number = -1

  add(environment: Environment, statement: Node) {
    // console.log(this.cursor)
    this.cursor++
    // console.log('call stack cursor', this.cursor)
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
