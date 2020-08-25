import parser from './config/Parser'
import TokenBuffer from './lexer/TokenBuffer'

const parse = (tokenBuffer: TokenBuffer): any => {
  return parser.parse(tokenBuffer)
}

export default parse
