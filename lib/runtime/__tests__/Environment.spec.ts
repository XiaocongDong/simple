import Environment from "../Environment"

const testKey = 'key'
const testValue = 'value'

describe('environment', () => {
  describe('set', () => {
    it('it should set the value with key', () => {
      const env = new Environment() as any
      env.set(testKey, testValue)

      expect(env.values).toEqual({[testKey]: testValue})
    })

    it('it should get the value with key if itself has this key', () => {
      const env = new Environment() as any
      env.values = {[testKey]: testValue}

      expect(env.get(testKey)).toEqual(testValue)
    })

    it('it should get the value with key if its parent has that key', () => {
      const parentEnv = new Environment() as any
      parentEnv.values = {[testKey]: testValue}
      const env = new Environment(parentEnv)
      
      expect(env.get(testKey)).toEqual(testValue)
    })

    it('it should get null if it and its parent don\'t have that key', () => {
      const parentEnv = new Environment()
      const env = new Environment(parentEnv)

      expect(env.get(testKey)).toBeNull()
    })
  })
})
