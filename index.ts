import parser from './lib/parser'
import tokenizer from './lib/tokenizer'

tokenizer.parse('let a = 10 + 10;')
const tokenBuffer = tokenizer.getTokenBuffer()
console.log(tokenBuffer)
console.log(parser(tokenBuffer))

