import { TOKEN_TYPE } from "../lexer/types/token"

export enum ASSOCIATIVITY {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export interface IOperation {
  tokenType: TOKEN_TYPE,
  priority: number,
  associativity: ASSOCIATIVITY
}

class Operators {
  operators: Array<IOperation> = []

  add(tokenType: TOKEN_TYPE, priority: number, associativity: ASSOCIATIVITY) {
    this.operators.push({
      tokenType,
      priority,
      associativity
    })
    return this
  }

  findOperation(tokenType: TOKEN_TYPE): IOperation  {
    return this.operators.find(({ tokenType: operatorTokenType }) => {
      return tokenType === operatorTokenType
    })
  }

  // if op2 priority is greater than op1, than op2 will form an expression
  // if not, op1 will form an binary node
  rightIsExpression(op1: IOperation, op2: IOperation) {
    if (op1.associativity === ASSOCIATIVITY.LEFT) {
      return op1.priority < op2.priority
    } else {
      return op1.priority <= op2.priority
    }
  }
}

export default Operators
