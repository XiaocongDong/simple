import { Runtime } from '../runtime'
import Node from '../../ast/node/Node'
import Environment from '../Environment'
import BreakStatement from '../../ast/node/BreakStatement'
import ReturnStatement from '../../ast/node/ReturnStatement'

let runtime: Runtime = null

beforeEach(() => {
  runtime = new Runtime()
})

describe('runtime', () => {
  describe('isBreak', () => {
    it('it should be set to true after executing the break statement', () => {
      const environment = new Environment()
      const breakStatement = new BreakStatement()
      runtime.callStack.add(environment, breakStatement)
      runtime.finishLastIterationCall = jest.fn()
  
      breakStatement.evaluate = jest.fn()

      runtime.resume()
  
      expect(breakStatement.evaluate).toHaveBeenCalledTimes(1)
      expect(runtime.finishLastIterationCall).toHaveBeenCalledTimes(1)
      expect(runtime.isBreak).toBe(true)
    })
  })

  describe('isReturn', () => {
    it('it should be set to true after executing the return', () => {
      const environment = new Environment()
      const returnStatement = new ReturnStatement()
      const mockValue = 1
      returnStatement.evaluate = jest.fn().mockReturnValue(mockValue)
      runtime.callStack.add(environment, returnStatement)
      runtime.finishLastFunctionCall = jest.fn()
  

      runtime.resume()
  
      expect(returnStatement.evaluate).toHaveBeenCalledTimes(1)
      expect(runtime.finishLastFunctionCall).toHaveBeenCalledTimes(1)
      expect(runtime.getLastFunctionExecutionResult()).toEqual(mockValue)
      expect(runtime.isReturn).toBe(true)
    })
  })

  describe('resume', () => {
  })
})