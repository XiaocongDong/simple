import UpdateExpression from "../UpdateExpression"
import Environment from "../../../runtime/Environment"
import Identifier from "../Identifier"
import { TOKEN_TYPE } from "../../../lexer/types/token"

let updateExpression: UpdateExpression = null
let currentValue = 10
let environment: Environment = null

beforeAll(() => {
  updateExpression = new UpdateExpression()
  updateExpression.argument = new Identifier()
  updateExpression.argument.evaluate = jest.fn().mockReturnValue(currentValue)
  environment = new Environment()
  environment.update = jest.fn()
})

describe('UpdateExpression', () => {
  describe('evaluate', () => {
    it('it should get nextValue when update is prefix and operator is plus_plus', () => {
      updateExpression.operator = TOKEN_TYPE.PLUS_PLUS
      updateExpression.prefix = true

      expect(updateExpression.evaluate(environment)).toEqual(currentValue + 1)
    })

    it('it should get currentValue when update is postfix and operator is plus_plus', () => {
      updateExpression.operator = TOKEN_TYPE.PLUS_PLUS
      updateExpression.prefix = false

      expect(updateExpression.evaluate(environment)).toEqual(currentValue)
    })

    it('it should get nextValue when update is prefix and operator is minus_minus', () => {
      updateExpression.operator = TOKEN_TYPE.MINUS_MINUS
      updateExpression.prefix = true

      expect(updateExpression.evaluate(environment)).toEqual(currentValue - 1)
    })

    it('it should get currentValue when update is postfix and operator is minus_minus', () => {
      updateExpression.operator = TOKEN_TYPE.MINUS_MINUS
      updateExpression.prefix = false

      expect(updateExpression.evaluate(environment)).toEqual(currentValue)
    })
  })
})