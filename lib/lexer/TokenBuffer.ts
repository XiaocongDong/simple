import { IToken } from "./types/token"

class TokenBuffer {
  private tokens: Array<IToken> = []
  private cursor: number = 0

  peek() {
    return this.tokens[this.cursor]
  }

  read() {
    const currentToken = this.tokens[this.cursor]
    const nextCursor = this.cursor < this.tokens.length ? ++this.cursor : this.tokens.length
    this.cursor = nextCursor
    return currentToken
  }

  unread() {
    const lastCursor = --this.cursor
    this.cursor = lastCursor
    return this.tokens[lastCursor]
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
