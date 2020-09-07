import * as fs from 'fs'
import simple from './lib/simple'

const code = fs.readFileSync('./tests/functionParam.js', 'utf-8')
simple(code)


