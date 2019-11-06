/** @module object */
'use strict'

const { isArr } = require('./array')
const { isFunc } = require('./method')

/**
 * @function
 * Mocks out console functions -- during testing only.
 * @param {Array} names - function name keys for console module, e.g. 'error' 
 * @param {Function} getMock - optional function for getting the mock for a console function. Like jest.fn
 * @returns - a function that resets all the mocks
 * @example 
 * const resetMocks = mockConsole(['error', 'warn])
 * // tests //
 * resetMocks()
 */
const mockConsole = (names=[], getMock=jest.fn) => {
  if (!isArr(names)) {
    console.error('Names must be an array of strings')
    return null
  }

  if (!isFunc(getMock)) {
    console.error('getMock must be a function')
    return null
  }

  const resetters = names.map(name => {
    const originalFn = console[name]
    console[name] = getMock()
    return () => (console[name] = originalFn) // reset one mock
  })

  // reset all mocks
  return () => resetters.map(reset => reset())
}

module.exports = {
  mockConsole
}