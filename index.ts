import parser from './lib/parser'
import tokenizer from './lib/tokenizer'

tokenizer.parse('let a = true;')
const tokenBuffer = tokenizer.getTokenBuffer()
console.log(tokenBuffer)
console.log(parser(tokenBuffer))

