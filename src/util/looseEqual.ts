// Taken from vuejs core (https://github.com/vuejs/core/blob/main/packages/shared/src/looseEqual.ts), used under MIT licence:
//
// The MIT License (MIT)
//
// Copyright (c) 2018-present, Yuxi (Evan) You
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const objectToString = Object.prototype.toString
const toTypeString = (value: unknown): string => objectToString.call(value)
const isArray = Array.isArray
const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'
const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

function looseCompareArrays(a: any[], b: any[]) {
  if (a.length !== b.length) return false
  let equal = true
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i])
  }
  return equal
}

export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true
  let aValidType = isDate(a)
  let bValidType = isDate(b)
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false
  }
  aValidType = isSymbol(a)
  bValidType = isSymbol(b)
  if (aValidType || bValidType) {
    return a === b
  }
  aValidType = isArray(a)
  bValidType = isArray(b)
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false
  }
  aValidType = isObject(a)
  bValidType = isObject(b)
  if (aValidType || bValidType) {
    /* istanbul ignore if: this if will probably never be called */
    if (!aValidType || !bValidType) {
      return false
    }
    const aKeysCount = Object.keys(a).length
    const bKeysCount = Object.keys(b).length
    if (aKeysCount !== bKeysCount) {
      return false
    }
    for (const key in a) {
      // eslint-disable-next-line no-prototype-builtins
      const aHasKey = a.hasOwnProperty(key)
      // eslint-disable-next-line no-prototype-builtins
      const bHasKey = b.hasOwnProperty(key)
      if ((aHasKey && !bHasKey) || (!aHasKey && bHasKey) || !looseEqual(a[key], b[key])) {
        return false
      }
    }
  }
  return String(a) === String(b)
}
