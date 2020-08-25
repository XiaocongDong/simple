import rule from "../ast/rule"
import BooleanLiteral from "../ast/node/BooleanLiteral"
import { TOKEN_TYPE } from "../lexer/types/token"
import SingleExpression from "../ast/node/SingleExpression"
import VariableModifier from "../ast/node/variableModifier"
import VariableDeclarator from "../ast/node/VariableDeclarator"
import VariableStatement from "../ast/node/VariableStatement"

const booleanLiteral = rule(BooleanLiteral).or(
  rule().token(TOKEN_TYPE.TRUE),
  rule().token(TOKEN_TYPE.FALSE)
)
const singleExpression = rule(SingleExpression).or(
  booleanLiteral
)
const variableModifier = rule(VariableModifier)
  .or(
    rule().token(TOKEN_TYPE.LET),
    rule().token(TOKEN_TYPE.CONST)
  )
const variableDeclarator = rule(VariableDeclarator)
  .token(TOKEN_TYPE.IDENTIFER)
  .option(
    rule()
    .token(TOKEN_TYPE.EQUAL)
    .ast(singleExpression)
  )
const variableStatement = rule(VariableStatement)
  .ast(variableModifier)
  .ast(variableDeclarator)

const statement = rule().or(
  variableStatement
)
const program = rule()
  .repeat(
    rule().ast(statement).or(
      rule().token(TOKEN_TYPE.SEMI_COLON),
      rule().token(TOKEN_TYPE.EOL)
  ))

export default program
