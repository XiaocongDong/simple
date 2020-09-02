class Environment {
  private parent: Environment = null
  private values: Object = {}

  constructor(env?: Environment) {
    this.parent = env
  }

  set(key: string, value: any) {
    this.values[key] = value
  }

  get(key: string) {
    if(this.values.hasOwnProperty(key)) {
      return this.values[key]
    }
  
    let currentEnvironment = this.parent
    while(currentEnvironment) {
      const value = currentEnvironment.get(key)
      if (value) {
        return value
      }
      currentEnvironment = currentEnvironment.parent
    }

    return null
  }
}

export default Environment
