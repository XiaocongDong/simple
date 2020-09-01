import Node from './Node'
import { NODE_TYPE } from '../types/node'
import Identifier from './Identifier'
import MemberAccessTailer from './MemberAccessTailer'
import FunctionCallTailer from './FunctionCallTailer'
import MemberExpression from './MemberExpression'
import CallExpression from './CallExpression'

class ObjectAccessExpression extends Node {
  type: NODE_TYPE = NODE_TYPE.OBJECT_ACCESS_EXPRESSION

  create(children: Array<Node>): Node {
    const identifier = children[0] as Identifier
    const accesses = children.slice(1) as Array<MemberAccessTailer|FunctionCallTailer>

    let node: Node = identifier

    for(let access of accesses) {
      let newNode = null

      switch(access.type) {
        case NODE_TYPE.MEMBER_ACCESS_TAILER: {
          newNode = new MemberExpression()
          newNode.object = node
          newNode.property = (<MemberAccessTailer>access).property
          break
        }
        case NODE_TYPE.FUNCTION_CALL_TAILER: {
          newNode = new CallExpression()
          newNode.callee = node
          newNode.arguments = (<FunctionCallTailer>access).arguments
          break
        }
        default:
            throw new Error(`unsupported access type ${access.type} at ${access.loc}`)
      }

      newNode.loc.start = node.loc.start
      newNode.loc.end = access.loc.end

      node = newNode
    }

    return node
  }
}

export default ObjectAccessExpression
