import Node from './Node'
import { NODE_TYPE } from '../types/node'
import BlockStatement from './BlockStatement'
import FunctionParams from './FunctionParams'

class FunctionDeclaration extends Node {
  type: NODE_TYPE.FUNCTION_DECLARATION
  id: Node
  params: Array<Node> = []
  body: Node

  create(children: Array<Node>): Node {
    const name = children[0]
    this.id = name
  
    const params = children[1]
    if (params instanceof FunctionParams) {
      this.params = params.params
      this.body = children[2]
    } else {
      this.body = params
    }
    return this
  }
}

export default FunctionDeclaration
