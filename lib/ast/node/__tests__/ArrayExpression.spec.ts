import ArrayExpression from "../ArrayExpression"
import NumberLiteral from "../NumberLiteral"
import Environment from "../../../runtime/Environment"

describe('ArrayExpression', () => {
  describe('evaluate', () => {
    it('it should return array', () => {
      const arrayExpression = new ArrayExpression()
      const number1 = 1
      const number2 = 2
      const number3 = 3
      const numberLiteral1 = new NumberLiteral()
      const numberLiteral2 = new NumberLiteral()
      const numberLiteral3 = new NumberLiteral()
      numberLiteral1.evaluate = jest.fn().mockReturnValue(number1)
      numberLiteral2.evaluate = jest.fn().mockReturnValue(number2)
      numberLiteral3.evaluate = jest.fn().mockReturnValue(number3)

      arrayExpression.elements = [numberLiteral1, numberLiteral2, numberLiteral3]

      expect(arrayExpression.evaluate(new Environment())).toEqual([number1, number2, number3])
    })
  })
})