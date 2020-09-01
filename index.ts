import parser from './lib/parser'
import tokenizer from './lib/tokenizer'

tokenizer.parse('function(a,b,c){};')
const tokenBuffer = tokenizer.getTokenBuffer()
console.log(tokenBuffer)
console.log(parser(tokenBuffer))

