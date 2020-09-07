import rule from "../ast/parser/rule"
import BooleanLiteral from "../ast/node/BooleanLiteral"
import VariableModifier from "../ast/node/VariableModifier"
import VariableDeclarator from "../ast/node/VariableDeclarator"
import VariableStatement from "../ast/node/VariableStatement"
import NumberLiteral from "../ast/node/NumberLiteral"
import StringLiteral from "../ast/node/StringLiteral"
import BlockStatement from "../ast/node/BlockStatement"
import IfStatement from "../ast/node/IfStatement"
import Operators, { ASSOCIATIVITY } from "../ast/parser/Operators"
import BinaryExpression from "../ast/node/BinaryExpression"
import Identifier from "../ast/node/Identifier"

import FunctionDeclaration from "../ast/node/FunctionDeclaration"
import FunctionParams from "../ast/node/FunctionParams"
import StatementList from "../ast/node/StatementList"

import { TOKEN_TYPE } from "../lexer/types/token"
import CallArguments from "../ast/node/CallArguments"
import MemberAccessTailer from "../ast/node/MemberAccessTailer"
import FunctionCallTailer from "../ast/node/FunctionCallTailer"
import ObjectAccessExpression from "../ast/node/ObjectAccessExpression"
import AssignmentExpression from "../ast/node/AssignmentExpression"
import WhileStatement from "../ast/node/WhileStatement"
import BreakStatement from "../ast/node/BreakStatement"
import ReturnStatement from "../ast/node/ReturnStatement"
import UpdateExpression from "../ast/node/UpdateExpression"
import ExpressionStatement from "../ast/node/ExpressionStatement"
import ForStatement from "../ast/node/ForStatement"
import ArrayExpression from "../ast/node/ArrayExpression"
import ObjectExpression from "../ast/node/ObjectExpression"
import FunctionExpression from "../ast/node/FunctionExpression"

const booleanLiteral = rule(BooleanLiteral).or(
  rule().token(TOKEN_TYPE.TRUE),
  rule().token(TOKEN_TYPE.FALSE)
)
const numberLiteral = rule(NumberLiteral).token(TOKEN_TYPE.NUMBER_LITERAL)
const stringLiteral = rule(StringLiteral).token(TOKEN_TYPE.STRING_LITERAL)
const identifier = rule(Identifier).token(TOKEN_TYPE.IDENTIFER)

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

const prefixUpdateExpression = rule(UpdateExpression).ast(identifier).or(
  rule().token(TOKEN_TYPE.PLUS_PLUS),
  rule().token(TOKEN_TYPE.MINUS_MINUS)
)
const postfixUpdateExpression = rule(UpdateExpression).or(
  rule().token(TOKEN_TYPE.PLUS_PLUS),
  rule().token(TOKEN_TYPE.MINUS_MINUS)
).ast(identifier)
const binaryExpression = rule(BinaryExpression)
const memberAccessTailer = rule(MemberAccessTailer).or(
  rule().separator(TOKEN_TYPE.LEFT_SQUARE_BRACKET).ast(binaryExpression).separator(TOKEN_TYPE.RIGHT_SQUARE_BRACKET),
  rule().separator(TOKEN_TYPE.DOT).ast(identifier)
)
const callArguments = rule(CallArguments).option(
  rule().ast(binaryExpression).repeat(
    rule().separator(TOKEN_TYPE.COMMA).ast(binaryExpression)
  )
)
const functionCallTailer = rule(FunctionCallTailer).separator(TOKEN_TYPE.LEFT_PAREN).ast(callArguments).separator(TOKEN_TYPE.RIGHT_PAREN)
const accessTailer = rule().or(memberAccessTailer, functionCallTailer)
const objectAccessExpression = rule(ObjectAccessExpression).ast(identifier).ast(accessTailer).repeat(accessTailer)

const assignmentExpression = rule(AssignmentExpression).or(
  identifier,
  objectAccessExpression
).or(
  rule().token(TOKEN_TYPE.ASSIGN),
  rule().token(TOKEN_TYPE.PLUS_ASSIGN),
  rule().token(TOKEN_TYPE.MINUS_ASSIGN)
)
assignmentExpression.or(assignmentExpression, binaryExpression)
const arrayExpression = rule(ArrayExpression)
  .separator(TOKEN_TYPE.LEFT_SQUARE_BRACKET)
  .option(
    rule().ast(binaryExpression).repeat(
      rule().separator(TOKEN_TYPE.COMMA).ast(binaryExpression)
    )
  )
  .separator(TOKEN_TYPE.RIGHT_SQUARE_BRACKET)
const objectExpression = rule(ObjectExpression)
  .separator(TOKEN_TYPE.LEFT_CURLY_BRACE)
  .option(
    rule()
      .ast(identifier)
      .separator(TOKEN_TYPE.COLON)
      .ast(binaryExpression)
      .repeat(
        rule()
          .separator(TOKEN_TYPE.COMMA)
          .ast(identifier)
          .separator(TOKEN_TYPE.COLON)
          .ast(binaryExpression)
      )
  )
  .separator(TOKEN_TYPE.RIGHT_CURLY_BRACE)

const functionDeclaration = rule(FunctionDeclaration)
const functionExpression = rule(FunctionExpression)
const factor = rule().or(
  rule()
    .separator(TOKEN_TYPE.LEFT_PAREN)
    .ast(binaryExpression)
    .separator(TOKEN_TYPE.RIGHT_PAREN),
  functionExpression,
  prefixUpdateExpression,
  postfixUpdateExpression,
  objectExpression,
  objectAccessExpression,
  arrayExpression,
  identifier,
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
const breakStatement = rule(BreakStatement).separator(TOKEN_TYPE.BREAK)
const returnStatement = rule(ReturnStatement).separator(TOKEN_TYPE.RETURN).option(binaryExpression)

const statement = rule()

const statementList = rule(StatementList)
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
ifStatement
  .separator(TOKEN_TYPE.IF)
  .separator(TOKEN_TYPE.LEFT_PAREN)
  .ast(binaryExpression)
  .separator(TOKEN_TYPE.RIGHT_PAREN)
  .ast(blockStatement)
  .option(
    rule().or(
      rule().separator(TOKEN_TYPE.ELSE).ast(ifStatement),
      rule().separator(TOKEN_TYPE.ELSE).ast(blockStatement)
    )
  )
const functionParams = rule(FunctionParams)
  .ast(identifier).repeat(
    rule().separator(TOKEN_TYPE.COMMA).ast(identifier)
  )
functionDeclaration
  .separator(TOKEN_TYPE.FUNCTION)
  .ast(identifier)
  .separator(TOKEN_TYPE.LEFT_PAREN)
  .option(
    functionParams
  )
  .separator(TOKEN_TYPE.RIGHT_PAREN)
  .ast(blockStatement)
functionExpression
  .separator(TOKEN_TYPE.FUNCTION)
  .separator(TOKEN_TYPE.LEFT_PAREN)
  .option(
    functionParams
  )
  .separator(TOKEN_TYPE.RIGHT_PAREN)
  .ast(blockStatement)

const whileStatement = rule(WhileStatement)
  .separator(TOKEN_TYPE.WHILE)
  .separator(TOKEN_TYPE.LEFT_PAREN)
  .ast(binaryExpression)
  .separator(TOKEN_TYPE.RIGHT_PAREN)
  .ast(blockStatement)
const expressionStatement = rule(ExpressionStatement).or(
  prefixUpdateExpression,
  postfixUpdateExpression,
  objectAccessExpression
)
const forArguments = rule()
  .option(statement)
  .separator(TOKEN_TYPE.SEMI_COLON)
  .option(binaryExpression)
  .separator(TOKEN_TYPE.SEMI_COLON)
  .ast(statement)

const forStatement = rule(ForStatement)
  .separator(TOKEN_TYPE.FOR)
  .separator(TOKEN_TYPE.LEFT_PAREN)
  .ast(forArguments)
  .separator(TOKEN_TYPE.RIGHT_PAREN)
  .ast(blockStatement)

statement
  .or(
    breakStatement,
    returnStatement,
    expressionStatement,
    variableStatement,
    assignmentExpression,
    whileStatement,
    ifStatement,
    forStatement,
    functionDeclaration,
  )


const program = statementList

export default program
