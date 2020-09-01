import Node from '../node/Node'
import SyntaxNode from "./SyntaxNode"
import Parser from "../Parser"
import Operators, { IOperation } from "../Operators"
import TokenBuffer from '../../lexer/TokenBuffer'
import SyntaxError from '../../errors/Syntax'
import BinaryExpression from '../node/BinaryExpression'

class ExpressionNode extends SyntaxNode {
  factor: Parser
  operators: Operators
  constructor(factor, operators) {
    super()
    this.factor = factor
    this.operators = operators
  }

  process(tokenBuffer: TokenBuffer): Node {
    const left = this.factor.parse(tokenBuffer)
    if (!left) {
      return null
    }

    let result = left

    while (!tokenBuffer.isEmpty()) {
      const currOperator = this.peekNextOperator(tokenBuffer)
      if (!currOperator) {
        break
      }
      // consume operator
      tokenBuffer.read()

      result = this.doShift2(result, currOperator, tokenBuffer)
    }

    return result
  }

  doShift2(left: Node, currOperator: IOperation, tokenBuffer: TokenBuffer): Node {
    const result = new BinaryExpression()

    let right = this.factor.parse(tokenBuffer)
    if (!right) {
      const currOperatorToken = tokenBuffer.unread()
      throw new SyntaxError(`missing right-hand operator`, currOperatorToken.range.end)
    }

    while(!tokenBuffer.isEmpty()) {
      const nextOperator = this.peekNextOperator(tokenBuffer)
      if (!nextOperator) {
        break
      }

      if (this.operators.rightIsExpression(currOperator, nextOperator)) {
        // consume operator token
        tokenBuffer.read()
        right = this.doShift2(right, nextOperator, tokenBuffer)
      } else {
        break
      }
    }

    result.left = left
    result.right = right
    result.loc.start = left.loc.start
    result.loc.end = right.loc.end
    result.operator = currOperator.tokenType

    return result
  }

  doShift(left: Node, currOperator: IOperation, right: Node, nextOperator: IOperation, tokenBuffer: TokenBuffer): Node {
    let nextRight: any = this.factor.parse(tokenBuffer)
    let nextNextOperator = this.peekNextOperator(tokenBuffer)

    if (!nextRight) {
      const operator = tokenBuffer.unread()
      throw new SyntaxError('missing right-hand operator in binary expression', operator.range.end)
    }

    const node = new BinaryExpression()

    if (this.operators.rightIsExpression(currOperator, nextOperator)) {

      // const rightNode = this.doShift(right, nextOperator, nextRight, nextNextOperator, tokenBuffer)

      // let rightNode = null
      // if (!nextNextOperator) {
      //   rightNode = new BinaryExpression()
      //   rightNode.left = right
      //   rightNode.right = nextRight
      //   rightNode.operator = nextOperator.tokenType
      // } else {
      //   rightNode = this.doShift(right, nextOperator, nextRight, nextNextOperator, tokenBuffer)
      // }

      // node.right = rightNode

      // node.loc.start = node.left.loc.start
      // node.loc.end = node.right.loc.end
    } else {
      const node = new BinaryExpression()
      node.left = left
      node.right = right
      node.operator = currOperator.tokenType
      
      return node
    }
  
    return node
  }

  peekNextOperator(tokenBuffer: TokenBuffer): IOperation {
    const operatorToken = tokenBuffer.peek()
    if (!operatorToken) {
      return null
    }
    const operator = this.operators.findOperation(operatorToken.type)
    return operator
  }
}

export default ExpressionNode
