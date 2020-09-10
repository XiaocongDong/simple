import * as fs from 'fs'
import simple from './dist/simple'

const code = fs.readFileSync('./tests/console.js', 'utf-8')
simple(code)


