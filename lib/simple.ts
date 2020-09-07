import parser from './parser'
import Environment from './runtime/Environment'
import tokenizer from './Tokenizer'

export default (code: string) => {
  const env = new Environment()
  env.create('console', {
    log: console.log
  })
  env.create('process', {
  })
  console.time('tokenizer')
  tokenizer.parse(code)
  console.timeLog('tokenizer')
  console.time('parser')
  const node = parser(tokenizer.getTokenBuffer())
  console.timeLog('parser')
  console.time('evaluate')
  node.evaluate(env)
  console.timeLog('evaluate')
}
