import Node from '../../ast/node/Node'
import CallStack from '../CallStack'
import Environment from '../Environment'

let callStack: CallStack = null

beforeEach(() => {
  callStack = new CallStack()
})

describe('CallStack', () => {
  describe('add', () => {
    it('it should add statement to stacks', () => {
      expect(callStack.isEmpty()).toBeTruthy()
      callStack.add(new Environment(), new Node())
      expect(callStack.isEmpty()).toBeFalsy()
      expect(callStack.getCursor()).toEqual(0)
    })
  })

  describe('peek', () => {
    it('it should get the statement out without change the cursor', () => {
      const statement = new Node()
      const environment = new Environment()

      callStack.add(environment, statement)
      expect(callStack.getCursor()).toEqual(0)
      expect(callStack.peek()).toEqual({ environment, statement })
      expect(callStack.getCursor()).toEqual(0)
    })
  })

  describe('pop', () => {
    it('it should read the statement out and change the cursor', () => {
      const statement = new Node()
      const environment = new Environment()

      callStack.add(environment, statement)

      expect(callStack.getCursor()).toEqual(0)
      expect(callStack.isEmpty()).toBeFalsy()

      expect(callStack.pop()).toEqual({ environment, statement })
      expect(callStack.getCursor()).toEqual(-1)
      expect(callStack.isEmpty()).toBeTruthy()
    })
  })

  describe('setCursor', () => {
    it('it should set the cursor of stack', () => {
      const statement = new Node()
      const environment = new Environment()

      callStack.add(environment, statement)
      callStack.add(environment, statement)
      callStack.add(environment, statement)

      expect(callStack.getCursor()).toEqual(2)
      
      callStack.setCursor(1)

      expect(callStack.getCursor()).toEqual(1)
    })
  })
})