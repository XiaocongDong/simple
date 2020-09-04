import { Runtime } from '../runtime'
import Node from '../../ast/node/Node'
import Environment from '../Environment'

let runtime: Runtime = null

beforeEach(() => {
  runtime = new Runtime()
})

describe('runtime', () => {
  describe('markFunctionCallPosition', () => {
    // it('it should mark function call position', () => {
    //   runtime.callStack.add(new Environment(), new Node())
    //   runtime.markFunctionCallPosition()
    //   expect(runtime)
    // })
  })

  describe('moveBackToLastFunctionCallPosition', () => {
    
  })

  describe('markIterationCallPosition', () => {

  })

  describe('moveBackToLastIterationCallPosition', () => {

  })

  describe('resume', () => {

  })
})