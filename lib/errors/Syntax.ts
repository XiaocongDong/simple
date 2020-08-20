import { ILocation } from "../types/location"

class SyntaxError extends Error {
  constructor(msg: string, location: ILocation) {
    super(`SyntaxError: ${msg} at line ${location.line}, colum ${location.column}`)
  }
}

export default SyntaxError
