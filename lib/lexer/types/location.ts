export interface ILocation {
  column: number
  line: number
}

export interface ILocationRange {
  start: ILocation
  end: ILocation
}
