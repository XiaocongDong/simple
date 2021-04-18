import Node from './Node'
import { NODE_TYPE } from '../types/node'
import FunctionParams from './FunctionParams'
import Environment from '../../runtime/Environment'
import Identifier from './Identifier'
import BlockStatement from './BlockStatement'

class FunctionDeclaration extends Node {
  type: NODE_TYPE.FUNCTION_DECLARATION
  id: Identifier
  params: Array<Identifier> = []
  body: BlockStatement
  protected parentEnv: Environment

  create(children: Array<Node>): Node {
    const name = children[0] as Identifier
    this.id = name
  
    const params = children[1]
    if (params instanceof FunctionParams) {
      this.params = params.params
      this.body = children[2] as BlockStatement
    } else {
      this.body = params as BlockStatement
    }
    return this
  }

  evaluate(env: Environment): any {
    const func = new FunctionDeclaration()
    func.loc = this.loc
    func.id = this.id
    func.params = [...this.params]
    func.body = this.body
    // closure
    func.parentEnv = env

    env.create(this.id.name, func)
  }

  call(args: Array<any>, callerInstance?: any): any {
    if (this.params.length !== args.length) {
      throw new Error('function declared parameters are not matched with arguments')
    }

    const callEnvironment = new Environment(this.parentEnv)
    // initialize environments with args
    for (let i = 0; i < args.length; i++) {
      const argument = args[i]
      const param = this.params[i]

      callEnvironment.create(param.name, argument)
    }
    callEnvironment.create('arguments', args)

    // if function is called by an instance, this will be this instance, or it will be the global process object
    if (callerInstance) {
      callEnvironment.create('this', callerInstance)
    } else {
      callEnvironment.create('this', this.parentEnv.getRootEnv().get('process'))
    }

    this.body.evaluate(callEnvironment)
  }
}

export default FunctionDeclaration
