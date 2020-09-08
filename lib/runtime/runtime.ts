import CallStack from "./CallStack"
import ReturnStatement from "../ast/node/ReturnStatement"
import BreakStatement from "../ast/node/BreakStatement"
import RuntimeError from "../errors/Runtime"

export class Runtime {
  callStack: CallStack = new CallStack()
  private _lastFunctionExecutionResult: any = null
  private _isBreak = false
  private _isReturn = false

  resume(): any {
    if (this.callStack.isEmpty()) {
      return null
    }

    const { environment, statement } = this.callStack.peek()

    const value = statement.evaluate(environment)
    if (statement instanceof ReturnStatement) {
      this._isReturn = true
      this._lastFunctionExecutionResult = value
      try {
       this.finishLastFunctionCall()
      } catch (e) {
        throw new RuntimeError(e.message, statement.loc.start)
      }
    }

    if (statement instanceof BreakStatement) {
      this._isBreak = true
      try {
        this.finishLastIterationCall()
      } catch(e) {
        throw new RuntimeError(e.message, statement.loc.start)
      }
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

  finishLastFunctionCall() {
    if (!this.callStack.checkIfCanReturn()) {
      throw new Error('return statement can only exit in function body')
    }
  }

  finishLastIterationCall() {
    if (!this.callStack.checkIfCanBreak()) {
      throw new Error('break statement can only exist in iteration block')
    }
  }

  get isBreak(): boolean {
    return this._isBreak
  }

  get isReturn(): boolean {
    return this._isReturn
  }

  resetIsBreak() {
    this._isBreak = false
  }
}

const runtime = new Runtime()

export default runtime
