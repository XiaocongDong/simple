import config from '../Tokenizer'
import parse from "../../parser"
import Tokenizer from "../../lexer/Tokenizer"

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
    code: `++a;`,
    description: 'it should parse prefix update expression statement',
  },
  {
    code: `a++;`,
    description: 'it should parse postfix update expression statement',
  },
  {
    code: `let a = [];`,
    description: 'it should parse empty array'
  },
  {
    code: `let a = [1];`,
    description: 'it should parse single element array'
  },
  {
    code: `let a = [1, 2];`,
    description: 'it should parse multi-elements array'
  },
  {
    code: `let a = {};`,
    description: 'it should parse empty object'
  },
  {
    code: `let a = {a: 1};`,
    description: 'it should parse single property element'
  },
  {
    code: `let a = {outer: {inner: function(){}}, outer2: b};`,
    description: 'it should parse nested object'
  },
  {
    code: `function sum(a, b, c) {

    };`,
    description: 'it should parse function'
  },
  {
    code: `function sum() {
      let a = 10;
    };`,
    description: 'it should parse empty params function'
  },
  {
    code: `function sum() {
      let a = 1 + 1;
      return a;
    };`,
    description: 'it should parse return statement'
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
    code: `let a = call();`,
    description: 'it should parse call expression'
  },
  {
    code: `let a = arr[10].a[11].c;`,
    description: 'it should parse mixed bracket and dot member expression'
  },
  {
    code: `let a = b + a++ * 10;`,
    description: 'it should parse mixed update and binary expression'
  },
  {
    code: 'let a = arr[10](1,2).a;',
    description: 'it should parse mixed bracket, dot and call expression'
  },
  {
    code: `if(true) {
      let c = 10;
    };`,
    description: 'it should parse if statement'
  },
  {
    code: `if(true) {

    } else {

    };`,
    description: 'it should parse else alternate'
  },
  {
    code: `if(true) {

    } else if(true) {

    } else {

    };`,
    description: 'it should parse else if alternate'
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
  },
  {
    code: `a = 10;`,
    description: 'it should parse assignment'
  },
  {
    code: `a += 10;`,
    description: 'it should parse plus assignment',
  },
  {
    code: `a -= 10;`,
    description: 'it should parse minus assignment'
  },
  {
    code: `a = b = 10;`,
    description: 'it should parse chaining assignment'
  },
  {
    code: `while(1+1){

    };`,
    description: 'it should parse while statement'
  },
  {
    code: `while(true){
      break;
    };`,
    description: 'it should parse break statement'
  },
  {
    code: `for(let a = 10; a < 10; a++) {
      console.log(a);
    };`,
    description: 'it should parse for statement'
  },
  {
    code: `    
    function sumGenerator() {
      let sum = 1;

      return function(i) {
        sum = sum + i;
        return sum;
      };
    };

    let sum = sumGenerator();
    for (let i = 0; i < 10; i++) {
      console.log(sum(i));
    };
    `,
    description: 'it should parse real program'
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
