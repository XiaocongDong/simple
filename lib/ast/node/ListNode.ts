import Node from "./Node"

class ListNode extends Node {
  children: Array<Node> = []

  addChildren(node: Node) {
    this.children.push(node)
  }

  create(children: Array<Node>): Node {
    this.children = children
    return super.create(children)
  }
}

export default ListNode
