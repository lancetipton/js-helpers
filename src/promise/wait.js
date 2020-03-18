/** @module promise */

'use strict'

import { isObj } from './object'
import { isFunc } from './method'

/**
 * Stops execution for a given amount of time
 * @function
 * @param {number} time - Amount of time to wait
 * @return { void }
 */
export const wait = time => (new Promise((res, rej) => setTimeout(() => res(true), time)))