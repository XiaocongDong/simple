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

    it('it should set the parent values if key is not in current environment when isCreate is false', () => {
      const parentEnv = new Environment() as any
      parentEnv.values = {[testKey]: testValue}
      const env = new Environment(parentEnv) as any

      const newValue = 'newValue'
      env.set(testKey, newValue, false)

      expect(env.values).toEqual({})
      expect(parentEnv.values).toEqual({[testKey]: newValue})
    })
  })

  describe('get', () => {
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

    it('it should throw error if it and its parent don\'t have that key', () => {
      const parentEnv = new Environment()
      const env = new Environment(parentEnv)

      expect(() => env.get(testKey)).toThrow()
    })
  })
})
