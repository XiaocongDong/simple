import { IToken, TOKEN_TYPE } from "../lexer/types/token"
import { LET } from "../constants"
import TokenBuffer from "../lexer/TokenBuffer"
import parse from "../parser"

const testCases: Array<{tokens: Array<IToken>, description: string}> = [
  {
    tokens: [
      {
        type: TOKEN_TYPE.LET,
        value: LET,
        range: {
          start: {
            line: 0,
            column: 1
          },
          end: {
            line: 0,
            column: 3
          }
        }
      },
      {
        type: TOKEN_TYPE.IDENTIFER,
        value: 'a',
        range: {
          start: {
            line: 0,
            column: 5
          },
          end: {
            line: 0,
            column: 5
          }
        }
      },
      {
        type: TOKEN_TYPE.EQUAL,
        value: '=',
        range: {
          start: {
            line: 0,
            column: 7
          },
          end: {
            line: 0,
            column: 7
          }
        }
      },
      {
        type: TOKEN_TYPE.NUMBER_LITERAL,
        value: '10',
        range: {
          start: {
            line: 0,
            column: 9
          },
          end: {
            line: 0,
            column: 10
          }
        }
      }
    ],
    description: 'variable declaration'
  }
]

let tokenBuffer = null
beforeEach(() => {
  tokenBuffer = new TokenBuffer() as any
})

describe('parse', () => {
  testCases.forEach(({ tokens, description }) => {
    it(description, () => {
      tokenBuffer.tokens = tokens
      const ast = parse(tokenBuffer)
      expect(ast).toMatchSnapshot()
    })
  })
})
