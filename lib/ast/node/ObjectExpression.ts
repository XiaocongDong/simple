import Node from './Node'
import { NODE_TYPE } from '../types/node'
import ListNode from './ListNode'
import Environment from '../../runtime/Environment'
import Identifier from './Identifier'
import BinaryExpression from './BinaryExpression'

export class Property extends Node {
  type: NODE_TYPE = NODE_TYPE.PROPERTY
  key: Identifier
  value: BinaryExpression

  create(children: Array<Node>): Node {
    return this
  }
}

class ObjectExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.OBJECT_EXPRESSION
  properties: Array<Property> = []

  create(children: Array<Node>): Node {
    if (!children.length) {
      return this
    }

    const listNode = children[0] as ListNode
    
    if (listNode.children.length) {
      const property = new Property()
      const key = listNode.children[0] as Identifier
      const value = listNode.children[1] as BinaryExpression
      property.key = key
      property.value = value
      property.loc.start = key.loc.start
      property.loc.end = value.loc.end
      this.properties.push(property)

      const trailListNode = listNode.children[2] as ListNode
      if (trailListNode) {
        const trailListNodeChildren = trailListNode.children
        let index = 0
        while(index < trailListNodeChildren.length) {
          const property = new Property()
          const key = trailListNodeChildren[index] as Identifier
          const value = trailListNodeChildren[index + 1] as BinaryExpression

          property.key = key
          property.value = value
          property.loc.start = key.loc.start
          property.loc.end = value.loc.end
          
          this.properties.push(property)
          index = index + 2
        }
      }
    }

    return this
  }

  evaluate(env: Environment): any {
    let result = {}

    for (let property of this.properties) {
      result[property.key.name] = property.value.evaluate(env)
    }
    
    return result
  }
}

export default ObjectExpression
