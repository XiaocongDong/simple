import config from '../config/Tokenizer'
import parse from "../parser"
import Tokenizer from "../lexer/Tokenizer"

const testCases: Array<{code: string, description: string}> = [
  {
    code: `let a = 10;`,
    description: 'number variableDeclaration'
  },
  {
    code: `let a = 'hello world';`,
    description: 'string variableDeclaration'
  },
  {
    code: `if(true) {
      let c = 10;
    };`,
    description: 'ifStatement'
  }
]


describe('parse', () => {
  testCases.forEach(({ code, description }) => {
    it(description, () => {
      const tokenizer = new Tokenizer(config)
      tokenizer.parse(code)
      const tokenBuffer = tokenizer.getTokenBuffer()
      const ast = parse(tokenBuffer)
      expect(ast).toMatchSnapshot()
    })
  })
})
