import CallStack from "./CallStack"
import ReturnStatement from "../ast/node/ReturnStatement"
import WhileStatement from "../ast/node/WhileStatement"
import ForStatement from "../ast/node/ForStatement"

class Runtime {
  callStack: CallStack = new CallStack()
  private lastFunctionCall: number = -1
  private lastFunctionExecutionResult: any = null
  private lastIterationCall: number = null
  isBreak = false
  isReturn = false

  resume(): any {
    if (this.callStack.isEmpty()) {
      return null
    }

    const { environment, statement } = this.callStack.peek()
    const value = statement.evaluate(environment)
    if (statement instanceof ReturnStatement) {
      this.lastFunctionExecutionResult = value
      this.moveBackToLastFunctionCall()
      // return control 
      return
    }

    if (statement instanceof WhileStatement || statement instanceof ForStatement) {
      this.isBreak = true
      this.moveBackToLastIterationCall()
      return
    }

    this.callStack.pop()
  }

  setLastFunctionExecutionResult(result: any) {
    this.isReturn = true
    this.lastFunctionExecutionResult = result
  }

  getLastFunctionExecutionResult(): any {
    return this.lastFunctionExecutionResult
  }

  resetLastFunctionExecutionResult() {
    this.isReturn = false
    this.lastFunctionExecutionResult = null
  }

  markFunctionCall() {
    this.lastFunctionCall = this.callStack.getCursor()
  }

  markIterationCall() {
    this.lastIterationCall = this.callStack.getCursor()
  }

  moveBackToLastFunctionCall() {
    if (this.lastFunctionCall == -1) {
      throw new Error('return statement can only exit in function')
    }
    this.callStack.setCursor(this.lastFunctionCall)
    this.lastFunctionCall = -1
  }

  moveBackToLastIterationCall() {
    if (this.lastIterationCall == null || this.lastIterationCall < this.lastFunctionCall) {
      throw new Error('break statement only exist in iteration block')
    }

    this.callStack.setCursor(this.lastIterationCall)
    this.lastIterationCall = null
  }

  consumeIsBreak() {
    let isBreak = this.isBreak
    if (isBreak) {
      this.isBreak = false
    }
    return isBreak
  }
}

const runtime = new Runtime()

export default runtime
