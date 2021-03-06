import Node from './Node'
import Environment from '../../runtime/Environment'
import RuntimeError from '../../errors/Runtime'
import Identifier from './Identifier'
import { NODE_TYPE } from '../types/node'

class MemberExpression extends Node {
  type:NODE_TYPE = NODE_TYPE.MEMBER_EXPRESSION
  object: Node
  property: Node

  evaluate(env: Environment): any {
    const object = this.object.evaluate(env)
    
    let key 
    if (this.property instanceof Identifier) {
      key = this.property.name
    } else {
      key = this.property.evaluate(env)
    }

    let value

    try {
      value = object[key]
    } catch (e) {
      throw new RuntimeError(`${e.message}`, this.object.loc.start)
    }

    return value
  }
}

export default MemberExpression
