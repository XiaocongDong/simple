import ObjectExpression, { Property } from "../ObjectExpression"
import Environment from "../../../runtime/Environment"
import Identifier from "../Identifier"
import BinaryExpression from "../BinaryExpression"

describe('ObjectExpression', () => {
  describe('evaluate', () => {
    it('it should get object', () => {
      const objectExpression = new ObjectExpression()
      const element1Key = 'key1'
      const element2Key = 'key2'
      const element1Value = 'value1'
      const element2Value = 'value2'

      const property1 = new Property()
      const property2 = new Property()
      property1.key = new Identifier()
      property1.value = new BinaryExpression()
      property2.key = new Identifier()
      property2.value = new BinaryExpression()

      property1.key.name = element1Key
      property1.value.evaluate = jest.fn().mockReturnValue(element1Value)
      property2.key.name = element2Key
      property2.value.evaluate = jest.fn().mockReturnValue(element2Value)

      objectExpression.properties = [property1, property2]

      expect(objectExpression.evaluate(new Environment())).toEqual({
        [element1Key]: element1Value,
        [element2Key]: element2Value
      })
    })
  })
})