import { NEW_LINE } from "./constants"
import { ILocation } from "./types/location"

export default class LocationKeeper {
  private line: number = 1
  private column: number = 0
  private prevLocation: ILocation = null

  consume(char: string) {
    if (char === NEW_LINE) {
      this.line++
      this.column = 0
    } else {
      this.column++
    }
  }

  getCurrentLocation(): ILocation {
    return {
      line: this.line,
      column: this.column
    }
  }

  markLocation() {
    this.prevLocation = {
      line: this.line,
      column: this.column
    }
  }

  getPrevLocation(): ILocation {
    return this.prevLocation
  }
}
