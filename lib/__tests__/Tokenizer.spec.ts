import Tokenizer from '../Tokenizer'
import LocationKeeper from '../LocationKeeper'
import { IConfig } from '../types/Tokenizer'
import { TOKEN_TYPE } from '../types/token'
import { ILocation } from '../types/location'

enum State {
  INITIAL = 'INITIAL',
  NUMBER_LITERAL = 'NUMBER_LITERAL',
  START_STRING_LITERAL = 'START_STRING_LITERAL',
  STRING_LITERAL = 'STRING_LITERAL',
  UNKNOWN = 'UNKNOWN'
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
        },
        {
          state: State.START_STRING_LITERAL,
          checker: "'"
        }
      ]
    },
    [State.NUMBER_LITERAL]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.NUMBER_LITERAL
    },
    [State.START_STRING_LITERAL]: {
      isEnd: false,
      transitions: [
        {
          state: State.START_STRING_LITERAL,
          checker: /[^']/
        },
        {
          state: State.STRING_LITERAL,
          checker: (value: string) => value === "'"
        }
      ]
    },
    [State.STRING_LITERAL]: {
      isEnd: true,
      TokenType: TOKEN_TYPE.STRING_LITERAL
    }
  }
}

const currentLocation: ILocation = {
  line: 1,
  column: 1
}
const prevLocation: ILocation = {
  line: 1,
  column: 0
}

const stateTransferTestCases: Array<{state: State, buffer?: string, expectedState?: State, input: string, toThrow?: string, expectedTokenType?: TOKEN_TYPE , description: string}> = [
  {
    state: State.INITIAL,
    expectedState: State.NUMBER_LITERAL,
    input: '1',
    description: 'it should transfer state if input match string checker'
  },
  {
    state: State.START_STRING_LITERAL,
    expectedState: State.START_STRING_LITERAL,
    input: "a",
    description: 'it should transfer state if input match regex checker'
  },
  {
    state: State.START_STRING_LITERAL,
    expectedState: State.STRING_LITERAL,
    input: "'",
    description: 'it should transfer state if input match function checker'
  },
  {
    state: State.INITIAL,
    input: 'a',
    toThrow: `Invalid or unexpected token at line ${currentLocation.line}, column ${currentLocation.column}`,
    description: 'it should throw error when no target transition exists for this input and current state is not end'
  },
  {
    state: State.NUMBER_LITERAL,
    input: ' ',
    buffer: '1',
    expectedTokenType: TOKEN_TYPE.NUMBER_LITERAL,
    description: 'it should generate token when current state cannot transfer to other state based on current input and current state isEnd'
  }
]

let locationKeeper: LocationKeeper = null

beforeEach(() => {
  (locationKeeper as any) = {
    consume: jest.fn(), 
    line: 0, 
    column: 0, 
    markLocation: jest.fn(),
    prevLocation: null,
    getCurrentLocation: jest.fn((): ILocation => currentLocation), 
    getPrevLocation: jest.fn((): ILocation => prevLocation)
  }
})

describe('Tokenizer', () => {
  describe('consume', () => {
    let tokenizer = null
    let originalAddToken = null
    beforeEach(() => {
      tokenizer = new Tokenizer(testConfig) as any
      originalAddToken = tokenizer.addToken
      
      tokenizer.addToken = jest.fn()
      tokenizer.locationKeeper = locationKeeper
    })

    afterEach(() => {
      tokenizer.addToken = originalAddToken
    })

    stateTransferTestCases.forEach(({ state, buffer, expectedState, input, toThrow, expectedTokenType, description }) => {
      test(description, () => {
        
        tokenizer.state = state

        if (buffer) {
          tokenizer.buffer = buffer
        }
        
        if (toThrow) {
          expect(() => tokenizer.consume(input)).toThrow(toThrow)
          return
        }

        tokenizer.consume(input)
        if (expectedState) {
          expect(tokenizer.state).toBe(expectedState)
        }

        if (expectedTokenType) {
          expect(tokenizer.addToken).toBeCalledWith(expectedTokenType)
        }
      })
    })

    test('it should invoke locationKeeper.markLocation when state change from initial to other', () => {
      tokenizer.state = State.INITIAL
      
      tokenizer.consume('1')

      expect(locationKeeper.markLocation).toBeCalledTimes(1)
    })
  })
})
