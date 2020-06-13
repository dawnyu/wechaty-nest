
import { createHash } from 'crypto'

export const rm = (path: string) => {
  const exec = require('child_process').exec
  exec(`rm -rf ${path}`, (err: any) => {
    if (err) {
      console.log(err)
    }
  })
}

export const encrypt = (algorithm, content) => {
  const hash = createHash(algorithm)
  hash.update(content)
  return hash.digest('hex')
}
export const sha1 = (content) => encrypt('sha1', content)

export const md5 = (content) => encrypt('md5', content)

export default encrypt
