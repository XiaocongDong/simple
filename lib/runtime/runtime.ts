import CallStack from "./CallStack"
import ReturnStatement from "../ast/node/ReturnStatement"
import BreakStatement from "../ast/node/BreakStatement"
import RuntimeError from "../errors/Runtime"

export class Runtime {
  callStack: CallStack = new CallStack()
  private _lastFunctionCallPosition: number = -1
  private _lastFunctionExecutionResult: any = null
  private _lastIterationCallPosition: number = null
  private _isBreak = false
  private _isReturn = false

  resume(): any {
    if (this.callStack.isEmpty()) {
      return null
    }

    const { environment, statement } = this.callStack.peek()
    // console.log(statement)
    const value = statement.evaluate(environment)
    if (statement instanceof ReturnStatement) {
      this._isReturn = true
      this._lastFunctionExecutionResult = value
      try {
       this.moveBackToLastFunctionCallPosition()
      } catch (e) {
        throw new RuntimeError(e.message, statement.loc.start)
      }
      return
    }

    if (statement instanceof BreakStatement) {
      this._isBreak = true
      try {
        this.moveBackToLastIterationCallPosition()
      } catch(e) {
        throw new RuntimeError(e.message, statement.loc.start)
      }
      return
    }

    this.callStack.pop()
  }

  getLastFunctionExecutionResult(): any {
    return this._lastFunctionExecutionResult
  }

  resetLastFunctionExecutionResult() {
    this._isReturn = false
    this._lastFunctionExecutionResult = null
  }

  markFunctionCallPosition() {
    this._lastFunctionCallPosition = this.callStack.getCursor()
  }

  markIterationCallPosition() {
    this._lastIterationCallPosition = this.callStack.getCursor()
  }

  moveBackToLastFunctionCallPosition() {
    if (this._lastFunctionCallPosition == -1) {
      throw new Error('return statement can only exit in function body')
    }
    this.callStack.setCursor(this._lastFunctionCallPosition)
    this._lastFunctionCallPosition = -1
  }

  moveBackToLastIterationCallPosition() {
    if (this._lastIterationCallPosition == null || this._lastIterationCallPosition < this._lastFunctionCallPosition) {
      throw new Error('break statement can only exist in iteration block')
    }

    this.callStack.setCursor(this._lastIterationCallPosition)
    this._lastIterationCallPosition = null
  }

  get isBreak(): boolean {
    return this._isBreak
  }

  get isReturn(): boolean {
    return this._isReturn
  }

  resetIsBreak() {
    let isBreak = this._isBreak
    if (isBreak) {
      this._isBreak = false
    }
    return isBreak
  }
}

const runtime = new Runtime()

export default runtime
