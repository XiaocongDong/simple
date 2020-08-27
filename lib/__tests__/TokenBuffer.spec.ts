import TokenBuffer from '../lexer/TokenBuffer'
import { IToken, TOKEN_TYPE } from '../lexer/types/token'

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
  const anotherDummyToken: IToken = {
    value: 'anotherDummyToken',
    type: TOKEN_TYPE.IDENTIFER,
    range: {
      start: {
        line: 1,
        column: 2
      },
      end: {
        line: 2,
        column: 3
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

    it('it should be true when all of the token is read', () => {
      tokenBuffer.write(dummyToken)
      expect(tokenBuffer.isEmpty()).toBeFalsy()
      tokenBuffer.read()
      expect(tokenBuffer.isEmpty()).toBeTruthy()
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

    it('it should not read the token out and the current cursor remain the length of tokens after the tokens are all read out', () => {
      tokenBuffer.write(dummyToken)

      const token = tokenBuffer.read()
      tokenBuffer.read()
      tokenBuffer.read()

      expect(token).toEqual(dummyToken)
      expect(tokenBuffer.getCursor()).toEqual(1)
    })

    it('it should read', () => {
      tokenBuffer.write(dummyToken)
      tokenBuffer.write(anotherDummyToken)

      const firstToken = tokenBuffer.read()
      const secondToken = tokenBuffer.read()

      expect(firstToken).toEqual(dummyToken)
      expect(secondToken).toEqual(anotherDummyToken)
    })
  })

  describe('unread', () => {
    it('it should read the last read token out', () => {
      tokenBuffer.write(dummyToken)

      tokenBuffer.read()
      tokenBuffer.read()
      const token = tokenBuffer.unread()

      expect(token).toEqual(dummyToken)
      expect(tokenBuffer.getCursor()).toEqual(0)
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
