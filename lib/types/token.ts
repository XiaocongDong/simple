import { ILocationRange } from "./location";

export enum TOKEN_TYPE {
  IDENTIFER = 'IDENTIFIER',

  NUMBER_LITERAL = 'NUMBER_LITERAL',
  STRING_LITERAL = 'STRING_LITERAL',

  // keywords
  LET = 'LET',
  CONST = 'CONST',
  BREAK = 'BREAK',
  CONTINUE = 'CONTINUE',
  IF = 'IF',
  ELSE = 'ELSE',
  WHILE = 'WHILE',
  FUNCTION = 'FUNCTION',
  UNDEFINED = 'UNDEFINED',
  NULL = 'NULL',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  NEW = 'NEW',

  // mathematical operators
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

  // logical operators
  OR = 'OR',
  AND = 'AND',
  EQUAL = "EQUAL"
}

export interface IToken {
  type: TOKEN_TYPE
  value: string
  range: ILocationRange
}
