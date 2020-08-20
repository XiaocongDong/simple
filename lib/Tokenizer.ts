import TokenBuffer from "./TokenBuffer"
import LocationKeeper from './LocationKeeper'
import SyntaxError from './errors/Syntax'

import { IConfig, IState, IStateConfig, ITokenTypeGenerator } from "./types/Tokenizer"
import { SPACE, NEW_LINE } from "./constants"
import { TOKEN_TYPE, IToken } from "./types/token"

class Tokenizer {
  private tokenBuffer: TokenBuffer = new TokenBuffer()
  private config: IConfig = null
  private state: IState = null
  private locationKeeper: LocationKeeper = new LocationKeeper()
  private buffer: string = ''
  
  constructor(config: IConfig) {
    this.config = config
    this.state = config.initialState
  }

  getTokenBuffer() {
    return this.tokenBuffer
  }

  parse(code: string) {
    for(let i = 0; i < code.length; i++) {
      const ch = code[i]
      this.consume(ch)
    }
    this.end()
  }

  end() {
    if (this.state === this.config.initialState) {
      if (this.buffer) {
        throw new SyntaxError('Unexpected EOF', this.locationKeeper.getCurrentLocation())
      }
      return
    }
    
    const currentStateConfig: IStateConfig = this.config[this.state]
    if (currentStateConfig.isEnd) {
      this.addToken(currentStateConfig.TokenType)
    }
  }

  reset() {
    this.state = this.config.initialState
    this.buffer = ''
  }

  addToken(tokenType: TOKEN_TYPE|ITokenTypeGenerator) {
    const startLocation = this.locationKeeper.getPrevLocation()
    const endLocation = this.locationKeeper.getCurrentLocation()
    const token: IToken = {
      type: (typeof tokenType === 'function' ? tokenType(this.buffer) : tokenType),
      value: this.buffer,
      range: {
        start: startLocation,
        end: endLocation
      }
    }
    this.tokenBuffer.write(token)
  }

  consume(ch: string) {
    if ((ch === SPACE || ch === NEW_LINE) && this.state === this.config.initialState) {
      this.locationKeeper.consume(ch)
      return
    }

    const currentStateConfig: IStateConfig = this.config[this.state]
    const transitions = currentStateConfig.transitions
    if (!transitions) {
      if (!currentStateConfig.isEnd) {
        this.addToken(currentStateConfig.TokenType)
        this.reset()
        this.consume(ch)
        return
      }

      throw new SyntaxError(`Unexpected token ${this.buffer}`, this.locationKeeper.getCurrentLocation())
    }
  
    const targetTransition = transitions.find(({ checker }) => {
      if (typeof checker === 'string') {
        return ch === checker
      }

      if (checker instanceof RegExp) {
        return checker.test(ch)
      }

      return checker(ch)
    })

    if (!targetTransition) {
      if (currentStateConfig.isEnd) {
        this.addToken(currentStateConfig.TokenType)
        this.reset()
        this.consume(ch)
        return
      }

      this.locationKeeper.consume(ch)
      throw new SyntaxError('Invalid or unexpected token', this.locationKeeper.getCurrentLocation())      
    }

    this.locationKeeper.consume(ch)
    // when state start to transfer from initial state to other state, mark current location
    if (this.state === this.config.initialState && targetTransition.state !== this.config.initialState) {
      this.locationKeeper.markLocation()
    }

    this.state = targetTransition.state
    this.buffer += ch
  }
}

export default Tokenizer
