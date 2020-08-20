import { TOKEN_TYPE } from "./token"

export type IState = string
export type ITokenTypeGenerator = (value: string) => TOKEN_TYPE
export type IStateConfig = {
  isEnd: boolean
  TokenType?: TOKEN_TYPE|ITokenTypeGenerator
  transitions?: Array<ITransition>
}

interface ITransition {
  checker: RegExp|string|((ch: string) => boolean)
  state: string
}

export type IConfig = {
  states: Record<IState, IStateConfig>
  initialState: IState
}
