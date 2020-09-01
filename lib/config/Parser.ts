import rule from "../ast/rule"
import BooleanLiteral from "../ast/node/BooleanLiteral"
import SingleExpression from "../ast/node/SingleExpression"
import VariableModifier from "../ast/node/variableModifier"
import VariableDeclarator from "../ast/node/VariableDeclarator"
import VariableStatement from "../ast/node/VariableStatement"
import NumberLiteral from "../ast/node/NumberLiteral"
import StringLiteral from "../ast/node/StringLiteral"
import { TOKEN_TYPE } from "../lexer/types/token"
import BlockStatement from "../ast/node/BlockStatement"
import IfStatement from "../ast/node/IfStatement"
import Operators, { ASSOCIATIVITY } from "../ast/Operators"
import BinaryExpression from "../ast/node/BinaryExpression"

const booleanLiteral = rule(BooleanLiteral).or(
  rule().token(TOKEN_TYPE.TRUE),
  rule().token(TOKEN_TYPE.FALSE)
)
const numberLiteral = rule(NumberLiteral).token(TOKEN_TYPE.NUMBER_LITERAL)
const stringLiteral = rule(StringLiteral).token(TOKEN_TYPE.STRING_LITERAL)

const operators = new Operators()
operators.add(TOKEN_TYPE.EQUAL, 1, ASSOCIATIVITY.LEFT)
operators.add(TOKEN_TYPE.LESS_THAN, 2, ASSOCIATIVITY.LEFT)
operators.add(TOKEN_TYPE.LESS_EQUAL_THAN, 2, ASSOCIATIVITY.LEFT)
operators.add(TOKEN_TYPE.GREATER_THAN, 2, ASSOCIATIVITY.LEFT)
operators.add(TOKEN_TYPE.GREATER_EQUAL_THAN, 2, ASSOCIATIVITY.LEFT)
operators.add(TOKEN_TYPE.PLUS, 3, ASSOCIATIVITY.LEFT)
operators.add(TOKEN_TYPE.MINUS, 3, ASSOCIATIVITY.LEFT)
operators.add(TOKEN_TYPE.MULTIPLY, 4, ASSOCIATIVITY.LEFT)
operators.add(TOKEN_TYPE.DIVIDE, 4, ASSOCIATIVITY.LEFT)
const binaryExpression = rule(BinaryExpression)

const factor = rule().or(
  rule()
    .separator(TOKEN_TYPE.LEFT_PAREN)
    .ast(binaryExpression)
    .separator(TOKEN_TYPE.RIGHT_PAREN),
  stringLiteral,
  booleanLiteral,
  numberLiteral
)
binaryExpression.expression(factor, operators)

const variableModifier = rule(VariableModifier)
  .or(
    rule().token(TOKEN_TYPE.LET),
    rule().token(TOKEN_TYPE.CONST)
  )
const variableDeclarator = rule(VariableDeclarator)
  .token(TOKEN_TYPE.IDENTIFER)
  .option(
    rule()
    .token(TOKEN_TYPE.ASSIGN)
    .throw('incorrect right-hand expression')
    .ast(binaryExpression)
  )
const variableStatement = rule(VariableStatement)
  .ast(variableModifier)
  .ast(variableDeclarator)

const statement = rule()

const statementList = rule()
  .repeat(
    rule()
      .ast(statement)
      .throw('statement must end with semi colon')
      .separator(TOKEN_TYPE.SEMI_COLON)
  )
const blockStatement = rule(BlockStatement)
  .separator(TOKEN_TYPE.LEFT_CURLY_BRACE)
  .ast(statementList)
  .separator(TOKEN_TYPE.RIGHT_CURLY_BRACE)

const ifStatement = rule(IfStatement)
.separator(TOKEN_TYPE.IF)
.separator(TOKEN_TYPE.LEFT_PAREN)
.ast(binaryExpression)
.separator(TOKEN_TYPE.RIGHT_PAREN)
.ast(blockStatement)

statement
  .or(
    variableStatement,
    ifStatement
  )


const program = statementList

export default program
