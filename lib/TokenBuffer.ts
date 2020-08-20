import { IToken } from "./types/token"

class TokenBuffer {
  private tokens: Array<IToken> = []
  private cursor: number = 0

  peek() {
    return this.tokens[this.cursor]
  }

  read() {
    return this.tokens[this.cursor++]
  }

  write(token: IToken) {
    this.tokens.push(token)
  }

  getCursor() {
    return this.cursor
  }

  setCursor(cursor: number) {
    this.cursor = cursor
  }

  toJSON(): Array<IToken> {
    return this.tokens
  }

  isEmpty(): boolean {
    return this.cursor === this.tokens.length
  }
}

export default TokenBuffer
