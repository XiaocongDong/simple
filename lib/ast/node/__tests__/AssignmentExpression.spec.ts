import AssignmentExpression from "../AssignmentExpression"
import Identifier from "../Identifier"
import Environment from "../../../runtime/Environment"
import BinaryExpression from "../BinaryExpression"
import MemberExpression from "../MemberExpression"
import { Property } from "../ObjectExpression"
import { TOKEN_TYPE } from "../../../lexer/types/token"

describe('AssignmentExpression', () => {
  describe('evaluate', () => {
    it('it should set when left-hand is identifier', () => {
      const assignmentExpression = new AssignmentExpression()
      assignmentExpression.assignType = TOKEN_TYPE.ASSIGN
      const leftHand = new Identifier()
      const rightHand = new BinaryExpression()
      assignmentExpression.left = leftHand
      assignmentExpression.right = rightHand
      const testKey = 'key'
      const testOriginalValue = 'value1'
      const testValue = 'value2'
      const environment = new Environment() as any
      environment.values = {[testKey]: testOriginalValue}
      leftHand.name =testKey
      rightHand.evaluate = jest.fn().mockReturnValue(testValue)

      assignmentExpression.evaluate(environment)
      expect(environment.values).toEqual({[testKey]: testValue})
    })

    it('it should set when left-handle is memberExpression', () => {
      const assignmentExpression = new AssignmentExpression()
      assignmentExpression.assignType = TOKEN_TYPE.ASSIGN
      const leftHand = new MemberExpression()
      const rightHand = new BinaryExpression()
      const identifier = new Identifier()
      const property = new Property()
      const testObject = {
        key: 'value'
      }
      const newValue = 'value2'
      leftHand.object = identifier
      identifier.evaluate = jest.fn().mockReturnValue(testObject)
      property.evaluate = jest.fn().mockReturnValue('key')
      leftHand.property = property

      rightHand.evaluate = jest.fn().mockReturnValue(newValue)

      assignmentExpression.left = leftHand
      assignmentExpression.right = rightHand

      assignmentExpression.evaluate(new Environment())

      expect(testObject).toEqual({key: newValue})
    })
  })  
})
