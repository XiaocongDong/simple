import BinaryExpression from "../BinaryExpression"
import NumberLiteral from "../NumberLiteral"
import { TOKEN_TYPE } from "../../../lexer/types/token"

let binaryExpression: BinaryExpression = null
const testCases: Array<{operator: TOKEN_TYPE, leftValue: any, rightValue: any, expectValue: any, description: string}> = [
  {
    operator: TOKEN_TYPE.EQUAL,
    leftValue: 1,
    rightValue: 1,
    expectValue: true,
    description: 'it should evaluate equal operator true'
  },
  {
    operator: TOKEN_TYPE.EQUAL,
    leftValue: 1,
    rightValue: 2,
    expectValue: false,
    description: 'it should evaluate equal operator false'
  },
  {
    operator: TOKEN_TYPE.LESS_THAN,
    leftValue: 1,
    rightValue: 2,
    expectValue: true,
    description: 'it should evaluate less than true'
  },
  {
    operator: TOKEN_TYPE.LESS_THAN,
    leftValue: 2,
    rightValue: 1,
    expectValue: false,
    description: 'it should evaluate less than false'
  },
  {
    operator: TOKEN_TYPE.LESS_EQUAL_THAN,
    leftValue: 1,
    rightValue: 1,
    expectValue: true,
    description: 'it should evaluate less equal than true'
  },
  {
    operator: TOKEN_TYPE.LESS_EQUAL_THAN,
    leftValue: 2,
    rightValue: 1,
    expectValue: false,
    description: 'it should evaluate less equal than false'
  },
  {
    operator: TOKEN_TYPE.GREATER_THAN,
    leftValue: 2,
    rightValue: 1,
    expectValue: true,
    description: 'it should evaluate greater than true'
  },
  {
    operator: TOKEN_TYPE.GREATER_THAN,
    leftValue: 1,
    rightValue: 2,
    expectValue: false,
    description: 'it should evaluate greater than false'
  },
  {
    operator: TOKEN_TYPE.GREATER_EQUAL_THAN,
    leftValue: 1,
    rightValue: 1,
    expectValue: true,
    description: 'it should evaluate greater equal than true'
  },
  {
    operator: TOKEN_TYPE.GREATER_EQUAL_THAN,
    leftValue: 1,
    rightValue: 2,
    expectValue: false,
    description: 'it should evaluate greater equal than false'
  },
  {
    operator: TOKEN_TYPE.PLUS,
    leftValue: 1,
    rightValue: 1,
    expectValue: 2,
    description: 'it should evaluate plus operator'
  },
  {
    operator: TOKEN_TYPE.MINUS,
    leftValue: 1,
    rightValue: 1,
    expectValue: 0,
    description: 'it should evaluate minus operator'
  },
  {
    operator: TOKEN_TYPE.MULTIPLY,
    leftValue: 3,
    rightValue: 2,
    expectValue: 6,
    description: 'it should evaluate multiply operator'
  },
  {
    operator: TOKEN_TYPE.DIVIDE,
    leftValue: 10,
    rightValue: 2,
    expectValue: 5,
    description: 'it should evaluate divide operator'
  }
]

beforeEach(() => {
  binaryExpression = new BinaryExpression()
  binaryExpression.left = new NumberLiteral()
  binaryExpression.right = new NumberLiteral()
})

describe('BinaryExpression', () => {
  describe('evaluate', () => {
    testCases.forEach(({operator, rightValue, leftValue, expectValue, description}) => {
      it(description, () => {
        binaryExpression.left.evaluate = jest.fn().mockReturnValue(leftValue)
        binaryExpression.right.evaluate = jest.fn().mockReturnValue(rightValue)
        binaryExpression.operator = operator

        expect(binaryExpression.evaluate()).toEqual(expectValue)
      })
    })
  })
})
