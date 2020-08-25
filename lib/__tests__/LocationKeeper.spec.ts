import LocationKeeper from '../lexer/LocationKeeper'

const testCases: Array<{inputChars: string, expectedLine: number, expectedColumn, description: string}> = [
  {
    inputChars: '',
    expectedLine: 1,
    expectedColumn: 0,
    description: 'test empty string'
  },
  {
    inputChars: 'abc',
    expectedLine: 1,
    expectedColumn: 3,
    description: 'test single line string'
  },
  {
    inputChars: 'abc\nefg\n',
    expectedLine: 3,
    expectedColumn: 0,
    description: 'test multiple-lines string with empty end string'
  },
  {
    inputChars: 'abc\nefg\nsdsd',
    expectedLine: 3,
    expectedColumn: 4,
    description: 'test multiple-lines string with non-empty end string'
  }
]

// TODO add preLocationTestCases

describe('test locationKeeper', () => {
  let locationKeeper: LocationKeeper = null

  beforeEach(() => {
    locationKeeper = new LocationKeeper()
  })

  describe('consume', () => {
    testCases.forEach(({ inputChars, expectedLine, expectedColumn, description }) => {
      test(description, () => {
        for (let i = 0; i < inputChars.length; i++) {
          locationKeeper.consume(inputChars[i])
        }
  
        const location = locationKeeper.getCurrentLocation()
        expect(location.line).toEqual(expectedLine)
        expect(location.column).toEqual(expectedColumn)
      })
    })
  })
})
