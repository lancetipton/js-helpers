/** @module object */

import { isFunc } from '../method/isFunc'
import { isArr } from '../array/isArr'
import { isObj } from './isObj'
import { deepClone } from '../collection/deepClone'
import { isColl } from '../collection/isColl'

/**
 * Deep merges an array of objects together.
 * @function
 * @param {Array} sources - array of objects to join
 * @returns {Object|Array} - merged object or array
 */
export const deepMerge = (...sources) => {
  return sources.reduce((merged, source) => 
      isArr(source)
        // Check if it's array, and join the arrays
        ? [ ...((isArr(merged) && merged) || []), ...deepClone(source) ]
          // Check if it's an object, and loop the properties
        : isObj(source)
          // Loop the entries of the object, and add them to the merged object
          ? Object.entries(source)
            .reduce((joined, [ key, value ]) => ({
                ...joined,
                // Check if the value is not a function and is an object
                // Also check if key is in the object
                // Set to value or deepMerge the object with the current merged object
                [key]: isColl(value) && key in joined
                  // This will always return an object
                  // So if it gets called then value is not getting set
                  ? deepMerge(joined[key], deepClone(value))
                  // Otherwise just set the value
                  : deepClone(value)
            // Pass in merged at the joined object
            }), merged)
          // If it's not an array or object, just return the merge object
          : merged,

    // Check the first source to decide what to merged value should start as
    (isArr(sources[0]) && [] || {}))
}
