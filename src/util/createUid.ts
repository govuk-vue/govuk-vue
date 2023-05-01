import { v4 as uuidv4 } from 'uuid'

export function createUid(prefix: String = '') {
  return `${prefix}${prefix ? '-' : ''}${uuidv4()}`
}
