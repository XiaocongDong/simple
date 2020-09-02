import { ILocation } from "../lexer/types/location"

class RuntimeError extends Error {
  constructor(msg: string, location: ILocation) {
    super(`RuntimeError: ${msg} at line ${location.line}, column ${location.column}`)
  }
}

export default RuntimeError
