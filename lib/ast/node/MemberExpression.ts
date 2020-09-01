import Node from './Node'
import Identifier from './Identifier'
import AccessExpression from './AccessExpression'

class MemberExpression extends Node {
  object: Node
  property: Node

  create(children: Array<Node>): Node {
    let currentNode = new MemberExpression()
    const identifier = children[0] as Identifier
    const accessExpression = children[1] as AccessExpression

    currentNode.object = identifier
    currentNode.property = accessExpression.property
    currentNode.loc.start = identifier.loc.start
    currentNode.loc.end = accessExpression.loc.end

    for(let i = 2; i < children.length; i++) {
      const memberExpression = new MemberExpression()
      const accessExpression = children[i] as AccessExpression
      memberExpression.object = currentNode
      memberExpression.property = accessExpression.property
      memberExpression.loc.start = currentNode.loc.start
      memberExpression.loc.end = currentNode.loc.end
      currentNode = memberExpression
    }

    return currentNode
  }
}

export default MemberExpression
