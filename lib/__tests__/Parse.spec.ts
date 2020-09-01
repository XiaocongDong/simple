import config from '../config/Tokenizer'
import parse from "../parser"
import Tokenizer from "../lexer/Tokenizer"

const testCases: Array<{code: string, description: string}> = [
  {
    code: `let a = 10;`,
    description: 'it should parse number literal expression'
  },
  {
    code: `let a = b;`,
    description: 'it should parse identifier'
  },
  {
    code: `function(a, b, c) {

    };`,
    description: 'it should parse function'
  },
  {
    code: `function() {
      let a = 10;
    };`,
    description: 'it should parse empty params function'
  },
  {
    code: `let a = 'hello world';`,
    description: 'it should parse string expression'
  },
  {
    code: `let a = b[10];`,
    description: 'it should parse bracket member expression'
  },
  {
    code: `let a = b.a;`,
    description: 'it should parse dot member expression'
  },
  {
    code: `let a = arr[10].a[11].c;`,
    description: 'it should parse mixed bracket and dot member expression'
  },
  {
    code: `if(true) {
      let c = 10;
    };`,
    description: 'it should parse if statement'
  },
  {
    code: `if(a == b + 10 * 20) {
    };`,
    description: 'it should parse expression in if statement'
  },
  {
    code: `let a = 10 + 10;`,
    description: 'it should parse number add'
  },
  {
    code: `let a = 10 + 10 + 10;`,
    description: 'it should parse number multi-add'
  },
  {
    code: `let a = 1 + 2 * 3 + 10;`,
    description: 'it should parse number add and multiplication'
  },
  {
    code: `let a = 1 + (2 + 2) + 3;`,
    description: 'it should parse parenthesis as higher priority'
  },
  {
    code: `let a = 1 + 2 * (4 + 5 - 1);`,
    description: 'it should parse parenthesis as higher priority and multiplication and add'
  },
  {
    code: `let a = 1 + 1 > 2 + 3;`,
    description: 'it should parse plus and logic operator together'
  },
  {
    code: `let a = 1 == 1 + 2 * 3;`,
    description: 'it should parse equal'
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
