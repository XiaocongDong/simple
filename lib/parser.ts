import parser from './config/Parser'
import TokenBuffer from './lexer/TokenBuffer'
import Node from './ast/node/Node'
import SyntaxError from './errors/Syntax'

const parse = (tokenBuffer: TokenBuffer): Node => {
  const rootNode = parser.parse(tokenBuffer)

  if (!tokenBuffer.isEmpty()) {
    const firstToken = tokenBuffer.peek()
    throw new SyntaxError(`unrecognized token ${firstToken.value}`, firstToken.range.start)
  }

  return rootNode
}

export default parse
