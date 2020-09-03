import Environment from "../Environment"

const testKey = 'key'
const testValue = 'value'

describe('environment', () => {
  describe('create', () => {
    it('it should create the value with key', () => {
      const env = new Environment() as any
      env.create(testKey, testValue)

      expect(env.values).toEqual({[testKey]: testValue})
    })
  })

  describe('update', () => {
    it('it should update the parent values if key is not in current environment', () => {
      const parentEnv = new Environment() as any
      parentEnv.values = {[testKey]: testValue}
      const env = new Environment(parentEnv) as any

      const newValue = 'newValue'
      env.update(testKey, newValue)

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
