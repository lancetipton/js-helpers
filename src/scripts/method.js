/** @module functions */

'use strict'

import { isNum } from './number'
import { hasOwn } from './object'

/**
 * Check if the passed in method is a function, and calls it
 * @example
 * checkCall((param1) => { return param1 }, 'foo')
 * // Returns 'foo'
 * @function
 * @param {function} method - function to call
 * @param {Object} params - params to pass to the method on call
 * @return {*} - whatever the passed in method returns
 */
export const checkCall = (method, ...params) =>  isFunc(method) && method(...params) || undefined

/**
 * Returns the first param if it's a function.
 * <br> If first param is not a function, returns second param.
 * @example
 * eitherFunc(() => {}, 'bar')
 * // Returns first param because it's a function.
 * @example
 * eitherFunc('foo', 'bar')
 * // Returns 'bar'
 * @function
 * @param {function} func1 - return if is func
 * @param {function} func2 - use if first is not an object
 * @returns {function}
 */
export const eitherFunc = (func1, func2) => (
  isFunc(func1) && func1 || func2
)

/**
 * Limits the amount of calls to a function over time
 * @example
 * debounce(myFunction)
 * // Calls myFunction after the default 250 ms
 * @example
 * debounce(myFunction, 500)
 * // Calls myFunction after 500 ms
 * @example
 * debounce(myFunction, 500, true)
 * // Calls myFunction immediately
 * @function
 * @param {function} func - function to call
 * @param {number} wait - how long to wait between function calls
 * @param {boolean} immediate - should call immediately
 * @return { void }
 */
export const debounce = (func, wait = 250, immediate = false) => {
  let timeout
  return (...args) => {
    if (!isFunc(func)) return null

    const context = this
    const later = () => {
      timeout = null
      !immediate && func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow)
      return isFunc(func) && func.apply(context, args)
  }
}

/**
 * Execute a method n times.
 * <br> Callback params - does not include number || callback method
 * @function
  * @example
 * doIt(10, window, [], (index, arr) => { arr.push(index) }) === [ 0,1,2 ... 8,9 ]
 * @param {number} args.0 - number of times to call the callback
 * @param {parent} args.1 - value to bind the method call to ( this )
 * @param {function} last arg of args array - method to call
 * @return { void }
 */
export const doIt = (...args) => {
  const params = args.slice()
  const num = params.shift()
  const cb = params.pop()
  if(!isNum(num) || !isFunc(cb)) return

  let i = -1
  while (++i < num)
    if (cb.call(params[0], i, ...params) === false) break
}

/**
 * Check if the passed in item is a function.
 * @example
 * isFunc(() => {})
 * // Returns true
 * @example
 * isFunc('bar')
 * // Returns false
 * @function
 * @param {*} test
 * @return {boolean} is a function
 */
export const isFunc = func => typeof func === 'function'

/**
 * Creates a method to memorize passed in methods output
 * @example
 * memorize(myFunction, cacheKeyFunction)
  * @example
 * memorize(myFunction, cacheKeyFunction, 100)
 * @function
 * @param {function} func - method to memorize output of
 * @param {function} getCacheKey - gets the key to save cached output
 * @return {function} memorized function with cache
 */
export const memorize = (func, getCacheKey, limit=1) => {
    if (!isFunc(func) || (getCacheKey && !isFunc(getCacheKey)))
      throw new TypeError('Expected a function')

    const memorized = function() {
      const cache = memorized.cache
      const key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0]

      if (hasOwn(cache, key)) return cache[key]

      const result = func.apply(this, arguments)
      !isNum(limit) || Object.key(cache).length < limit
        ? (cache[key] = result)
        : (memorized.cache = { [key]: result })

      return result
    }

    memorized.cache = {}
    memorized.destroy = () => {
      getCacheKey = undefined
      memorized.cache = undefined
      memorized.destroy = undefined
      memorized = undefined
    }

    return memorized
}

/**
 * Throttle function calls to only execute once over a wait period
 * @example
 * throttle(() => console.log('throttled'), 50)()
 * @function
 * @param {*} func - method to call after wait
 * @param {number} [wait=100] time to wait between calls
 * @return {function} throttled function
 */
export const throttle = (func, wait = 100) => {
  let waiting = false
  return (...args) => {
    if (waiting) return
    waiting = true
    func.apply(this, args)
    return setTimeout(() => {
      waiting = false
    }, wait)
  }
}

/**
 * Ensures the last call to the throttled function get called.
 * <br> Will wait the allotted time, before calling the last call to it.
 * <br> The final call will not execute until no more calls are made,
 * <br> Accepts a callback to call each time the throttle called,
 * @example
 * throttleLast(() => {}, () => {})()
 * // throttle function
 * @function
 * @param {function} func - method to call after wait
 * @param {function} cb - method to call after throttle function is called
 * @param {number} [wait=100] time to wait until executing func param
 * @return {function} throttled function
 */
export const throttleLast = (func, cb, wait = 100) => {
  let throttleTimeout
  return (...args) => {
    // If the throttle already exists clear it, and create it again
    if (throttleTimeout) clearTimeout(throttleTimeout)
    // Store a reference to the timeout
    // Will wait the allotted time until calling the final call to it
    throttleTimeout = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(throttleTimeout)
    }, wait)
    typeof cb === 'function' && cb()
  }
}


/**
 * Creates a uuid, unique up to around 20 million iterations.
 * <br> Good enough for us
 * @example
 * uuid()
 * // New uuid as a string
 * @function
 * @param {number} start of the uuid
 * @return {string} - build uuid
 */
export const uuid = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,uuid)