import CallStack from "./CallStack"
import ReturnStatement from "../ast/node/ReturnStatement"
import BreakStatement from "../ast/node/BreakStatement"
import RuntimeError from "../errors/Runtime"

export class Runtime {
  callStack: CallStack = new CallStack()
  private _functionCallPositionStack: Array<number> = []
  private _lastFunctionExecutionResult: any = null
  private _iterationCallPositionStack: Array<number> = []
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

  markFunctionCallPosition() {
    this._functionCallPositionStack.push(this.callStack.getCursor())
  }

  markIterationCallPosition() {
    this._iterationCallPositionStack.push(this.callStack.getCursor())
  }

  finishLastFunctionCall() {
    if (this._functionCallPositionStack.length == 0) {
      throw new Error('return statement can only exit in function body')
    }
    this._functionCallPositionStack.pop()
  }

  finishLastIterationCall() {
    const lastFunctionCall = this._functionCallPositionStack[this._functionCallPositionStack.length - 1]
    const lastIteraltionCall = this._iterationCallPositionStack[this._iterationCallPositionStack.length - 1]

    if (lastIteraltionCall == undefined || lastIteraltionCall == undefined || lastIteraltionCall < lastFunctionCall) {
      throw new Error('break statement can only exist in iteration block')
    }

    this._iterationCallPositionStack.pop()
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
