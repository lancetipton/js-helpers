/** @module string */

import { isFunc } from '../method/isFunc'
import { isColl } from '../collection/isColl'
import { get } from '../collection/get'
import { isStr } from './isStr'
/**
 * Simple template replace for ES6 template strings
 * @function
 * @example
 * template('${ who } in ${ where }!', { who: 'goats', where: 'boats' })
 * // Returns "goats in boats"
 * @param {string} template - String with ES6 syntax items to be replaced
 * @param {Object|Array} data - Data used to replace the ES6 placeholders
 * @param {any} fallback - Used it data does not contain key to be replaced
 *
 * @returns {string} - template with placeholder values filled
 */
export const template = (template, data, fallback='') => {
  data = isColl(data) && data || {}
  return isStr(template) &&
    template.replace(/\${([^{]+[^}])}/g, (match) => {
      const path = match.substr(2, match.length - 3).trim()
      const replaceWith = get(data, path, fallback)

      return isFunc(replaceWith)
        ? replaceWith(data, path, fallback)
        : replaceWith

    }) || template
}
