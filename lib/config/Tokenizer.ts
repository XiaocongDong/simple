import { IConfig } from "../types/Tokenizer";
import { TOKEN_TYPE } from "../types/token";
import { LET, CONST, BREAK, CONTINUE, IF, ELSE, WHILE, FUNCTION, UNDEFINED, NULL, TRUE, FALSE, NEW } from "../constants";

enum State {
  INITIAL = 'INITIAL',
  NUMBER_LITERAL = 'NUMBER_LITERAL',
  START_IDENTIFIER = 'IDENTIFER',
  IDENTIFER = 'IDENTIFER',
  START_STRING_LITERAL = 'START_STRING_LITERAL',
  STRING_LITERAL = 'STRING_LITERAL',

  PLUS = 'PLUS',
  PLUS_PLUS = 'PLUS_PLUS',
  MINUS = 'MINUS',
  MINUS_MINUS = 'MINUS_MINUS',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  PLUS_ASSIGN = 'PLUS_ASSIGN',
  MINUS_ASSIGN = 'MINUS_ASSIGN',
  MULTIPLY_ASSIGN = 'MULTIPLY_ASSIGN',
  DIVIDE_ASSIGN = 'DIVIDE_ASSIGN',
  ASSIGN = 'ASSIGN',

  START_OR = 'START_OR',
  EQUAL = 'EQUAL',
  OR = 'OR',
  START_AND = 'START_AND',
  AND = 'AND'
}

const keywordTokenTypeLookup: {[k: string]: TOKEN_TYPE} = {
  [LET]: TOKEN_TYPE.LET,
  [CONST]: TOKEN_TYPE.CONST,
  [BREAK]: TOKEN_TYPE.BREAK,
  [CONTINUE]: TOKEN_TYPE.CONTINUE,
  [IF]: TOKEN_TYPE.IF,
  [ELSE]: TOKEN_TYPE.ELSE,
  [WHILE]: TOKEN_TYPE.WHILE,
  [FUNCTION]: TOKEN_TYPE.FUNCTION,
  [UNDEFINED]: TOKEN_TYPE.UNDEFINED,
  [NULL]: TOKEN_TYPE.NULL,
  [TRUE]: TOKEN_TYPE.TRUE,
  [FALSE]: TOKEN_TYPE.FALSE,
  [NEW]: TOKEN_TYPE.NEW
}

const keywordChecker = (value) => {
  const tokenType = keywordTokenTypeLookup[value]
  return tokenType || TOKEN_TYPE.IDENTIFER
}

const config: IConfig = {
  initialState: State.INITIAL,
  states: {
    [State.INITIAL]: {
      isEnd: false,
      transitions: [
        {
          state: State.NUMBER_LITERAL,
          checker: /[0-9\.]/
        },
        {
          state: State.START_IDENTIFIER,
          checker: /[a-zA-Z_]/
        },
        {
          state: State.START_STRING_LITERAL,
          checker: "'"
        },
        {
          state: State.PLUS,
          checker: "+"
        },
        {
          state: State.MINUS,
          checker: "-"
        },
        {
          state: State.MULTIPLY,
          checker: "*"
        },
        {
          state: State.DIVIDE,
          checker: "/"
        },
        {
          state: State.ASSIGN,
          checker: "="
        },
        {
          state: State.START_OR,
          checker: "|"
        },
        {
          state: State.START_AND,
          checker: "&"
        }
      ]
    },
    [State.NUMBER_LITERAL]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.NUMBER_LITERAL,
      transitions: [
        {
          state: State.NUMBER_LITERAL,
          checker: /[0-9\.]/
        }
      ]
    },
    [State.START_IDENTIFIER]: {
      isEnd: true,
      TokenType: keywordChecker,
      transitions: [
        {
          state: State.IDENTIFER,
          checker: /[0-9a-zA-Z_]/
        }
      ]
    },
    [State.IDENTIFER]: {
      isEnd: true,
      TokenType: keywordChecker,
      transitions: [
        {
          state: State.IDENTIFER,
          checker: /[0-9a-zA-Z_]/
        }
      ]
    },
    [State.START_STRING_LITERAL]: {
      isEnd: false,
      transitions: [
        {
          state: State.START_STRING_LITERAL,
          checker: /[^']/
        },
        {
          state: State.STRING_LITERAL,
          checker: "'"
        }
      ]
    },
    [State.STRING_LITERAL]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.STRING_LITERAL
    },
    [State.PLUS]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.PLUS,
      transitions: [
        {
          state: State.PLUS_PLUS,
          checker: "+"
        },
        {
          state: State.PLUS_ASSIGN,
          checker: "="
        }
      ]
    },
    [State.PLUS_PLUS]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.PLUS_PLUS
    },
    [State.MINUS]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.MINUS,
      transitions: [
        {
          state: State.MINUS_MINUS,
          checker: "-"
        },
        {
          state: State.MINUS_ASSIGN,
          checker: "="
        }
      ]
    },
    [State.MINUS_MINUS]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.MINUS_MINUS
    },
    [State.MINUS_ASSIGN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.MINUS_ASSIGN
    },
    [State.MULTIPLY]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.MULTIPLY,
      transitions: [
        {
          state: State.MULTIPLY_ASSIGN,
          checker: "="
        }
      ]
    },
    [State.MULTIPLY_ASSIGN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.MULTIPLY_ASSIGN
    },
    [State.DIVIDE]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.DIVIDE,
      transitions: [
        {
          state: State.DIVIDE_ASSIGN,
          checker: "="
        }
      ]
    },
    [State.DIVIDE_ASSIGN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.DIVIDE_ASSIGN
    },
    [State.ASSIGN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.ASSIGN,
      transitions: [
        {
          state: State.EQUAL,
          checker: "="
        }
      ]
    },
    [State.EQUAL]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.EQUAL
    },
    [State.START_OR]: {
      isEnd: false,
      transitions: [
        {
          state: State.OR,
          checker: "|"
        }
      ]
    },
    [State.OR]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.OR
    },
    [State.START_AND]: {
      isEnd: false,
      transitions: [
        {
          state: State.AND,
          checker: "&"
        }
      ]
    },
    [State.AND]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.AND
    }
  }
}

export default config
