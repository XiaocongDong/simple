import Node from './Node'
import { NODE_TYPE } from '../types/node'
import FunctionParams from './FunctionParams'
import Environment from '../../runtime/Environment'
import Identifier from './Identifier'
import BlockStatement from './BlockStatement'

class FunctionDeclaration extends Node {
  type: NODE_TYPE.FUNCTION_DECLARATION
  id: Identifier
  params: Array<Identifier> = []
  body: BlockStatement
  parentEnv: Environment

  create(children: Array<Node>): Node {
    const name = children[0] as Identifier
    this.id = name
  
    const params = children[1]
    if (params instanceof FunctionParams) {
      this.params = params.params
      this.body = children[2] as BlockStatement
    } else {
      this.body = params as BlockStatement
    }
    return this
  }

  evaluate(env: Environment): any {
    env.create(this.id.name, this)
    this.parentEnv = env
  }
}

export default FunctionDeclaration
