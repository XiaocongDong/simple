import Parser from "./Parser";
import Node from '../node/Node'

const rule = (NodeClass?: new () => Node): Parser => {
  return new Parser(NodeClass)
}

export default rule
