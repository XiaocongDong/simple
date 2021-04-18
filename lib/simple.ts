import parser from './parser'
import Environment from './runtime/Environment'
import tokenizerConfig from './config/Tokenizer'
import Tokenizer from './lexer/Tokenizer'
import { IToken } from './lexer/types/token'
import Node from './ast/node/Node'

export default (code: string, config?: any): {tokens: Array<IToken>, node: Node, tokenizerTime: number, astTime: number, runTime: number} => {
  const env = new Environment()
  env.create('console', {
    log: console.log
  })
  env.create('process', {
  })

  if (config && config.global) {
    Object.entries(config.global).forEach(([key, value]) => {
      if (env.get(key) !== undefined) {
        env.update(key, value)
      } else {
        env.create(key, value)
      }
    })
  }

  const tokenizer = new Tokenizer(tokenizerConfig)
  const tokenizerStart = Date.now()
  tokenizer.parse(code)
  const tokenizerEnd = Date.now()

  const tokens = tokenizer.getTokenBuffer()

  const astStart = Date.now()
  const node = parser(tokens)
  const astEnd = Date.now()

  const runStart = Date.now()
  node.evaluate(env)
  const runEnd = Date.now()

  return {
    tokens: tokens.toJSON(),
    node,
    tokenizerTime: tokenizerEnd - tokenizerStart,
    astTime: astEnd - astStart,
    runTime: runEnd - runStart
  }
}
