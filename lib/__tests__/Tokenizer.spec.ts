import Tokenizer from '../Tokenizer'
import { IConfig } from '../types/Tokenizer'
import { TOKEN_TYPE } from '../types/token'
import { SPACE, NEW_LINE } from '../constants'

enum State {
  INITIAL = 'INITIAL',
  NUMBER_LITERAL = 'NUMBER_LITERAL'
}

const testConfig: IConfig = {
  initialState: State.INITIAL,
  states: {
    [State.INITIAL]: {
      isEnd: false,
      transitions: [
        {
          state: State.NUMBER_LITERAL,
          checker: '1'
        }
      ]
    },
    [State.NUMBER_LITERAL]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.NUMBER_LITERAL
    }
  }
}

const testCases: Array<{state: State, expectedState: State, input: string, description: string}> = [
  {
    state: State.INITIAL,
    expectedState: State.NUMBER_LITERAL,
    input: '1',
    description: 'it should transfer state if input match string checker'
  }
]

describe('Tokenizer', () => {
  describe('consume', () => {
    // test('it should only change the locationKeeper info when input is space', () => {
    //   const tokenizer = new Tokenizer(testConfig) as any
    //   const locationKeeperMock = jest.fn()
    //   tokenizer.locationKeeper = {consume: locationKeeperMock}
    //   tokenizer.consume(SPACE)

    //   expect(locationKeeperMock).toBeCalledWith(SPACE)
    //   expect(tokenizer.state).toBe(State.INITIAL)
    // })

    // test('it should only change the locationKeeper info when input is newline', () => {
    //   const tokenizer = new Tokenizer(testConfig) as any
    //   const locationKeeperMock = jest.fn()
    //   tokenizer.locationKeeper = {consume: locationKeeperMock}
    //   tokenizer.consume(NEW_LINE)

    //   expect(locationKeeperMock).toBeCalledWith(NEW_LINE)
    //   expect(tokenizer.state).toBe(State.INITIAL)
    // })

    testCases.forEach(({ state, expectedState, input, description }) => {
      test(description, () => {
        const tokenizer = new Tokenizer(testConfig) as any
        const locationKeeperMock = jest.fn()
        const markLocationKeeperMock = jest.fn()
        tokenizer.locationKeeper = {consume: locationKeeperMock, }
        tokenizer.consume(NEW_LINE)
      })
    })
  })
})
