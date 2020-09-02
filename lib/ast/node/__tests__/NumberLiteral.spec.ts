import NumberLiteral from "../NumberLiteral"

describe('NumberLiteral', () => {
  describe('evaluate', () => {
    it('it should return number', () => {
      const numberLiteral = new NumberLiteral()
      numberLiteral.value = 10

      expect(numberLiteral.evaluate()).toEqual(10)
    })
  })
})