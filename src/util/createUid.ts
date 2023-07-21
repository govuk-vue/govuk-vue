let id = 0

export function createUid(prefix: String = '') {
  return `${prefix}${prefix ? '-' : ''}${(id++).toString(36)}`
}
