import Node from './Node'
import Environment from '../../runtime/Environment'
import RuntimeError from '../../errors/Runtime'

class MemberExpression extends Node {
  object: Node
  property: Node

  evaluate(env: Environment): any {
    const object = this.object.evaluate(env)
    const key = this.property.evaluate(env)

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
