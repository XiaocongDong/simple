import TokenBuffer from "../../../lexer/TokenBuffer"
import VariableStatement from '../../../ast/node/VariableStatement'
import { IToken, TOKEN_TYPE } from "../../../lexer/types/token"
import { LET } from "../../../constants"
import rule from "../../../ast/parser/rule"
import Parser from "../../../ast/parser/Parser"

const testTokens: Array<IToken> = [
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
]

const testCases: Array<{tokens: Array<IToken>, parser: Parser, description: string, isSnapshotTest?: boolean, isNullTest?: boolean}> = [
  {
    tokens: [testTokens[0]],
    parser: rule().token(TOKEN_TYPE.LET),
    isSnapshotTest: true,
    description: 'it should generate token node'
  },
  {
    tokens: [testTokens[1]],
    parser: rule().token(TOKEN_TYPE.LET),
    isNullTest: true,
    description: 'it should not generate token node if rule doesn\'t match with token'
  },
  {
    tokens: [testTokens[0]],
    parser: rule().separator(TOKEN_TYPE.LET),
    isSnapshotTest: true,
    description: 'it should generate root node but no separator children node'
  },
  {
    tokens: [testTokens[0]],
    parser: rule().option(rule().token(TOKEN_TYPE.LET)),
    isSnapshotTest: true,
    description: 'it should generate node when option node exists'
  },
  {
    tokens: [testTokens[0]],
    parser: rule().option(rule().token(TOKEN_TYPE.CONST)),
    isSnapshotTest: true,
    description: 'it should generate root node but no token type children node'
  },
  {
    tokens: [testTokens[0]],
    parser: rule().or(rule().token(TOKEN_TYPE.CONST), rule().token(TOKEN_TYPE.LET)),
    isSnapshotTest: true,
    description: 'it should generate node when one of option of the or exists'
  },
  {
    tokens: [testTokens[0]],
    parser: rule().or(rule().token(TOKEN_TYPE.CONST), rule().token(TOKEN_TYPE.AND)),
    isNullTest: true,
    description: 'it should not generate node when one of the options matches with rule'
  },
  {
    tokens: [testTokens[0], testTokens[0]],
    parser: rule().repeat(rule().token(TOKEN_TYPE.LET)),
    isSnapshotTest: true,
    description: 'it should match as many as token when the rule is repeat'
  },
  {
    tokens: [testTokens[0], testTokens[1], testTokens[2], testTokens[3]],
    parser: rule(VariableStatement).ast(
      rule().or(rule().token(TOKEN_TYPE.LET), rule().token(TOKEN_TYPE.CONST))
    ).token(TOKEN_TYPE.IDENTIFER).option(
      rule().token(TOKEN_TYPE.EQUAL).token(TOKEN_TYPE.NUMBER_LITERAL)
    ),
    isSnapshotTest: true,
    description: 'it should match the snapshot when rule is nested and complicated'
  }
]

let tokenBuffer = null
beforeEach(() => {
  tokenBuffer = new TokenBuffer() as any
})

describe('Parser', () => {
  describe('parse', () => {
    testCases.forEach(({ tokens, parser, isSnapshotTest, isNullTest, description }) => {
      it(description, () => {
        (tokenBuffer.tokens as Array<IToken>) = tokens
        const node = parser.parse(tokenBuffer)
        if (isSnapshotTest) {
          expect(node).toMatchSnapshot()
        }
        if (isNullTest) {
          expect(node).toBeNull()
        }
      })
    })
  })  
})
