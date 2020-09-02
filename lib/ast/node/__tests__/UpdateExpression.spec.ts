import UpdateExpression from "../UpdateExpression"
import Environment from "../../../runtime/Environment"
import Identifier from "../Identifier"
import { TOKEN_TYPE } from "../../../lexer/types/token"

let updateExpression: UpdateExpression = null

beforeAll(() => {
  updateExpression = new UpdateExpression()
  updateExpression.argument = new Identifier()
})

describe('UpdateExpression', () => {
  describe('evaluate', () => {
    it('it should get nextValue when update is prefix and operator is plus_plus', () => {
      updateExpression.argument.evaluate = jest.fn().mockReturnValue(10)
      updateExpression.operator = TOKEN_TYPE.PLUS_PLUS
      updateExpression.prefix = true

      expect(updateExpression.evaluate(new Environment())).toEqual(11)
    })

    it('it should get currentValue when update is postfix and operator is plus_plus', () => {
      updateExpression.argument.evaluate = jest.fn().mockReturnValue(10)
      updateExpression.operator = TOKEN_TYPE.PLUS_PLUS
      updateExpression.prefix = false

      expect(updateExpression.evaluate(new Environment())).toEqual(10)
    })

    it('it should get nextValue when update is prefix and operator is minus_minus', () => {
      updateExpression.argument.evaluate = jest.fn().mockReturnValue(10)
      updateExpression.operator = TOKEN_TYPE.MINUS_MINUS
      updateExpression.prefix = true

      expect(updateExpression.evaluate(new Environment())).toEqual(9)
    })

    it('it should get currentValue when update is postfix and operator is minus_minus', () => {
      updateExpression.argument.evaluate = jest.fn().mockReturnValue(10)
      updateExpression.operator = TOKEN_TYPE.MINUS_MINUS
      updateExpression.prefix = false

      expect(updateExpression.evaluate(new Environment())).toEqual(10)
    })
  })
})