import { IConfig } from "../lexer/types/Tokenizer";
import { TOKEN_TYPE } from "../lexer/types/token";
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
  LESS_THAN = 'LESS_THAN',
  LESS_EQUAL_THAN = 'LESS_EQUAL_THAN',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_EQUAL_THAN = 'GREATER_EQUAL_THAN',

  ASSIGN = 'ASSIGN',
  COMMA = 'COMMA',
  DOT = 'DOT',

  LEFT_PAREN = 'LEFT_PAREN',
  RIGHT_PAREN = 'RIGHT_PAREN',
  SEMI_COLON = 'SEMI_COLON',
  LEFT_CURLY_BRACE = 'LEFT_CURLY_BRACE',
  RIGHT_CURLY_BRACE = 'RIGHT_CURLY_BRACE',
  LEFT_SQUARE_BRACKET = 'LEFT_SQUARE_BRACKET',
  RIGHT_SQUARE_BRACKET = 'RIGHT_SQUARE_BRACKET',
  COLON = 'COLON',

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
  if (value === 'constructor') {
    // object has an attribute named constructor in js...
    return TOKEN_TYPE.IDENTIFER
  }

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
          checker: /[0-9]/
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
        },
        {
          state: State.COLON,
          checker: ':'
        },
        {
          state: State.SEMI_COLON,
          checker: ';'
        },
        {
          state: State.LEFT_PAREN,
          checker: '('
        },
        {
          state: State.RIGHT_PAREN,
          checker: ')'
        },
        {
          state: State.LEFT_CURLY_BRACE,
          checker: '{'
        },
        {
          state: State.RIGHT_CURLY_BRACE,
          checker: '}'
        },
        {
          state: State.COMMA,
          checker: ','
        },
        {
          state: State.DOT,
          checker: '.'
        },
        {
          state: State.LEFT_SQUARE_BRACKET,
          checker: '['
        },
        {
          state: State.RIGHT_SQUARE_BRACKET,
          checker: ']'
        },
        {
          state: State.LESS_THAN,
          checker: '<'
        },
       {
         state: State.GREATER_THAN,
         checker: '>'
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
    },
    [State.SEMI_COLON]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.SEMI_COLON
    },
    [State.LEFT_PAREN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.LEFT_PAREN
    },
    [State.RIGHT_PAREN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.RIGHT_PAREN
    },
    [State.LEFT_CURLY_BRACE]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.LEFT_CURLY_BRACE
    },
    [State.RIGHT_CURLY_BRACE]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.RIGHT_CURLY_BRACE
    },
    [State.COMMA]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.COMMA
    },
    [State.DOT]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.DOT
    },
    [State.LEFT_SQUARE_BRACKET]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.LEFT_SQUARE_BRACKET
    },
    [State.RIGHT_SQUARE_BRACKET]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.RIGHT_SQUARE_BRACKET
    },
    [State.COLON]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.COLON
    },
    [State.LESS_THAN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.LESS_THAN,
      transitions: [
        {
          checker: '=',
          state: State.LESS_EQUAL_THAN
        }
      ]
    },
    [State.LESS_EQUAL_THAN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.LESS_EQUAL_THAN,
    },
    [State.GREATER_THAN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.GREATER_THAN,
      transitions: [
        {
          checker: '=',
          state: TOKEN_TYPE.GREATER_EQUAL_THAN
        }
      ]
    },
    [State.GREATER_EQUAL_THAN]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.GREATER_EQUAL_THAN
    }
  }
}

export default config
