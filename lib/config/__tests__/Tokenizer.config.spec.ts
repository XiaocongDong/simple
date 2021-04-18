import config from '../Tokenizer'
import Tokenizer from '../../lexer/Tokenizer'

const testCases: Array<{code: string, description: string}> = [
  {
    code:
    `let f = function(x, y, z) {
      return x+y*z
    };
    const a = [1, 2, 3, {1, 2, 3}, 'hi'];
    const o = {
      name: 'sean',
      age: 27
    };
    `,
    description: 'it should generate correct buffer'
  },
  {
    code: `
      let a = 10; // a is not defined
      let b = 40; // b is not defined
    `,
    description: 'it should skip comment'
  },
  {
    code: `let a = undefined`,
    description: 'it should parse undefined literal'
  },
  {
    code: `let a = null`,
    description: 'it should parse null literal'
  },
  {
    code: '!a',
    description: 'it should parse not'
  },
  {
    code: '!=',
    description: 'it should parse not equal'
  },
  {
    code: '!==',
    description: 'it should parse not strict equal'
  },
  {
    code: 'a===b',
    description: 'it should parse strict equal'
  },
  {
    code: `a += 'Simple'`,
    description: 'it should parse string'
  }
]

describe('Tokenizer with config', () => {
  testCases.forEach(({ code, description }) => {
    test(description, () => {
      const tokenizer = new Tokenizer(config)
      tokenizer.parse(code)
      const tokenBuffer = tokenizer.getTokenBuffer()
      expect(tokenBuffer.toJSON()).toMatchSnapshot()
    })
  })
})