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

const assignmentExpression = rule(AssignmentExpression).ast(identifier).separator(TOKEN_TYPE.ASSIGN)
assignmentExpression.or(assignmentExpression, binaryExpression)

const factor = rule().or(
  rule()
    .separator(TOKEN_TYPE.LEFT_PAREN)
    .ast(binaryExpression)
    .separator(TOKEN_TYPE.RIGHT_PAREN),
  objectAccessExpression,
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
const returnStatement = rule(ReturnStatement).separator(TOKEN_TYPE.RETURN).ast(binaryExpression)

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
  .separator(TOKEN_TYPE.IF)
  .separator(TOKEN_TYPE.LEFT_PAREN)
  .ast(binaryExpression)
  .separator(TOKEN_TYPE.RIGHT_PAREN)
  .ast(blockStatement)
const functionParams = rule(FunctionParams)
  .ast(identifier).repeat(
    rule().separator(TOKEN_TYPE.COMMA).ast(identifier)
  )
const functionStatement = rule(FunctionDeclaration)
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

statement
  .or(
    breakStatement,
    returnStatement,
    variableStatement,
    assignmentExpression,
    whileStatement,
    ifStatement,
    functionStatement
  )


const program = statementList

export default program
