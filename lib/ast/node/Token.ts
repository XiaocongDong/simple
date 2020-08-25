import Node from './Node'
import { NODE_TYPE } from '../types/node'
import { IToken } from '../../lexer/types/token'

class Token extends Node {
  type: NODE_TYPE = NODE_TYPE.TOKEN
  token: IToken = null

  constructor(token) {
    super()
    this.token = token
  }
}

export default Token
