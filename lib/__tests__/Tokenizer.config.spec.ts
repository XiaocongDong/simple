import config from '../config/Tokenizer'
import Tokenizer from '../Tokenizer'

const testCases: Array<{code: string, description: string}> = [
  {
    code:
    `let f = function(x, y, z) {
      return x+y*z
    }
    const a = [1, 2, 3, {1, 2, 3}, 'hi']
    const o = {
      name: 'sean',
      age: 27
    }
    `,
    description: 'it should generate correct buffer'
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