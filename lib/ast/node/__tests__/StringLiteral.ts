import StringLiteral from "../StringLiteral"

describe('StringLiteral', () => {
  describe('evaluate', () => {
    it('it should return string literal', () => {
      const stringLiteral = new StringLiteral()
      const testString = 'this is testing'
      stringLiteral.value = testString
      expect(stringLiteral.evaluate()).toEqual(testString)
    })
  })
})