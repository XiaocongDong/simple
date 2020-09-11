import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Token from './Token'
import Environment from '../../runtime/Environment'
import RuntimeError from '../../errors/Runtime'

class Identifier extends Node {
  type: NODE_TYPE = NODE_TYPE.IDENTIFIER
  name: string

  create(children: Array<Node>): Node {
    const token = children[0] as Token
    this.name = token.token.value
    return this
  }

  evaluate(parentEnv: Environment): any {
    try {
      const value = parentEnv.get(this.name)
      return value
    } catch(e) {
      throw new RuntimeError(`Uncaught ReferenceError: ${e.message}`, this.loc.start)
    }
  }
}

export default Identifier
