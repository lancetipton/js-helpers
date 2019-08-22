/** @module array */

'use strict'

/**
 * Randomly selects values from a passed in array.
 * @function
 * @example
 * randomArray([1,2,3], 1)
 * // Returns an array with one of the values in the passed in array
 * @param {array} arr - array to select values from
 * @param {number} amount - number of values to select from the array
 * @return {array} - randomly sorted array
 */
export const randomArray = (arr, amount) => {
  amount = amount || 1
  const randoms = []
  for (let i = 0; i < amount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)])
  }

  return amount === 1 ? randoms[0] : randoms
}

/**
 * Randomly sorts an arrays items.
 * @function
 * @example
 * randomizeArray([1,2,3])
 * // Returns an array randomly sorted
 * @param {array} arr - array to randomly sorted
 * @return {array} - randomly sorted array
 */
export const randomizeArray = arr => (
  arr.sort(() => (0.5 - Math.random()))
)

/**
 * Removes duplicates from an array.
 * @function
 * @example
 * uniqArr([1,1,2,3,3])
 * // Returns array with only unique values [ 1, 2, 3 ]
 * @param {array} arr - array to remove duplicates from
 * @return {array} - copy of passed in array, with duplicates removed
 */
export const uniqArr = arr => (
  isArr(arr) && arr.filter((e, i, arr) => arr.indexOf(e) == i) || arr
)

/**
 * Checks if passed in value is an array.
 * @function
 * @example
 * isArr([1,2,3])
 * // Returns true
 * @param {any} value - value to be check if is an array
 * @return {boolean} - T/F value is an array
 */
export const isArr = value => (
  Array.isArray(value)
)

/**
 * Creates a copy of the passed in array.
 * <br> Returns empty array, if param is not an array.
 * @function
 * @example
 * cloneArr([1,2,3])
 * // Returns copy of the passed on array
 * @param {array} arr - array to be copied
 * @return {array} - copy of passed in array
 */
export const cloneArr = arr => (
  Array.from([ ...(isArr(arr) && arr || []) ])
)