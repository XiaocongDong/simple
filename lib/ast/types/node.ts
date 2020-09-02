export enum NODE_TYPE {
  TOKEN = 'TOKEN',
  IDENTIFIER = 'IDENTIFIER',
  BOOLEAN_LITERAL = 'BOOLEAN_LITERAL',
  NUMBER_LITERAL = 'NUMBER_LITERAL',
  STRING_LITERAL = 'STRING_LITERAL',

  ASSIGNMENT_EXPRESSION = 'ASSIGNMENT_EXPRESSION',
  ARRAY_EXPRESSION = 'ARRAY_EXPRESSION',
  OBJECT_EXPRESSION = 'OBJECT_EXPRESSION',

  OBJECT_ACCESS_EXPRESSION = 'OBJECT_ACCESS_EXPRESSION',
  ACCESS_TAILER = 'ACCESS_TAILER',
  FUNCTION_CALL_TAILER = 'FUNCTION_CALL_TAILER',
  MEMBER_ACCESS_TAILER = 'MEMBER_ACCESS_TAILER',

  BREAK_STATEMENT = 'BREAK_STATEMENT',
  RETURN_STATEMENT = 'RETURN_STATEMENT',
  WHILE_STATEMENT = 'WHILE_STATEMENT',
  BLOCK_STATEMENT = 'BLOCK_STATEMENT',
  VARIABLE_STATEMENT = 'VARIABLE_STATEMENT',
  EXPRESSION_STATEMENT = 'EXPRESSION_STATEMENT',
  FOR_STATEMENT = 'FOR_STATEMENT',

  PROPERTY = 'PROPERTY',

  CALL_ARGUMENTS = 'CALL_ARGUMENTS',
  CALL_EXPRESSION = 'CALL_EXPRESSION',
  FUNCTION_PARAMS = 'FUNCTION_PARAMS',
  FUNCTION_DECLARATION = 'FUNCTION_DECLARATION',
  FUNCTION_EXPRESSION = 'FUNCTION_EXPRESSION',
  ACCESS_EXPRESSION = 'ACCESS_EXPRESSION',
  UPDATE_EXPRESSION = 'UPDATE_EXPRESSION',
  BINARY_EXPRESSION = 'BINARY_EXPRESSION',
  VARIABLE_MODIFIER = 'VARIABLE_MODIFIER',
  VARIABLE_DECLARATOR = 'VARIABLE_DECLARATOR',
  IF_STATEMENT = 'IF_STATEMENT',
  STATEMENT_LIST = 'STATEMENT_LIST',
}
