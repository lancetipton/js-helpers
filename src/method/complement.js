/** @module method */

/**
 * @function
 * Returns a new function that is the complement of predicate function `predicate`
 * @param {Function} predicate 
 * @returns {Function} the complement of `predicate`
 * @example
 * const isNegative = x => (x < 0)
 * const isNonNegative = complement(isNegative)
 * isNonNegative(1) // true
 */
export const complement = predicate => (...args) => !predicate(...args)