import RuntimeError from "../errors/Runtime"

class Environment {
  private parent: Environment = null
  protected values: Object = {}

  constructor(env?: Environment) {
    this.parent = env
  }

  set(key: string, value: any, isCreate = true) {
    if (isCreate) {
      if(this.values.hasOwnProperty(key)) {
        throw new Error(`${key} has been initialized`)
      }
      this.values[key] = value
    } else {
      const matchedEnvironment = this.getEnvironmentWithKey(key)
      if (!matchedEnvironment) {
        throw new Error(`${key} hasn't been defined`)
      }
      matchedEnvironment.values = {
        ...matchedEnvironment.values,
        [key]: value
      }
    }
  }

  get(key: string) {
    const matchedEnvironment = this.getEnvironmentWithKey(key)
    if (!matchedEnvironment) {
      throw new Error(`${key} is not defined`)
    }

    return matchedEnvironment.values[key]
  }

  private getEnvironmentWithKey(key: string): Environment {
    if(this.values.hasOwnProperty(key)) {
      return this
    }
  
    let currentEnvironment = this.parent
    while(currentEnvironment) {
      if (currentEnvironment.values.hasOwnProperty(key)) {
        return currentEnvironment
      }
      currentEnvironment = currentEnvironment.parent
    }

    return null
  }
}

export default Environment
