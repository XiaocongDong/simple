import TokenBuffer from '../TokenBuffer'
import { IToken, TOKEN_TYPE } from '../types/token'

describe('TokenBuffer', () => {
  let tokenBuffer: TokenBuffer = null
  const dummyToken: IToken = {
    value: 'dummy',
    type: TOKEN_TYPE.IDENTIFER,
    range: {
      start: {
        line: 1,
        column: 1
      },
      end: {
        line: 1,
        column: 1
      }
    }
  }

  beforeEach(() => {   
    tokenBuffer = new TokenBuffer()
  })

  describe('isEmpty', () => {
    it('it should be true when no token in the buffer', () => {
      expect(tokenBuffer.isEmpty()).toBeTruthy()
    })

    it('it should be false after token is written to the buffer', () => {
      tokenBuffer.write(dummyToken)
      expect(tokenBuffer.isEmpty()).toBeFalsy()
    })
  })

  describe('write', () => {
    it('it should write token to the buffer', () => {
      tokenBuffer.write(dummyToken)
      expect(tokenBuffer.isEmpty()).toBeFalsy()
    })
  })

  describe('peek', () => {
    it('it should read the token out without changing the cursor of the buffer', () => {
      tokenBuffer.write(dummyToken)

      const token = tokenBuffer.peek()
      expect(token).toEqual(dummyToken)
      expect(tokenBuffer.getCursor()).toEqual(0)
    })

    it('it should read undefined when there is no token in the buffer', () => {
      const token = tokenBuffer.peek()
      expect(token).toBeUndefined()
    })
  })

  describe('read', () => {
    it('it should read the token out and change the cursor of the buffer', () => {
      tokenBuffer.write(dummyToken)
      
      const token = tokenBuffer.read()
      expect(token).toEqual(dummyToken)
      expect(tokenBuffer.getCursor()).toEqual(1)
    })
  })

  describe('setCursor', () => {
    it('it should set the cursor of the buffer', () => {
      const cursorToBeSet = 10

      tokenBuffer.setCursor(cursorToBeSet)
      expect(tokenBuffer.getCursor()).toEqual(cursorToBeSet)
    })
  })
})
