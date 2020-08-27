import { TOKEN_TYPE } from "../lexer/types/token"

export enum ASSOCIATIVITY {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

class Operators {
  operators: Array<{tokenType: TOKEN_TYPE, priority: number, associativity: ASSOCIATIVITY}> = []

  add(tokenType: TOKEN_TYPE, priority: number, associativity: ASSOCIATIVITY) {
    this.operators.push({
      tokenType,
      priority,
      associativity
    })
    return this
  }
}

export default Operators
