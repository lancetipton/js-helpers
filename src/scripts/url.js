/** @module url */

'use strict'

import { reduceObj, isObj } from './object'
import { isStr } from './string'
import { isNum } from './number'
import { isBool } from './boolean'
import { isColl } from './collection'
import { isArr } from './array'

// 1. takes a querystring and return object
// 2. takes an object and return querystring

/**
 * takes a raw querystring input and converts it to an object
 * @param {String} querystring - querystring to parse into an object
 * 
 * @returns {Object}
 */
export const querystringToObj = querystring => {

  const currentQueryItems = {}
  const stringSplit = querystring.split('?')
  querystring = stringSplit[ stringSplit.length -1 ]

  if(!querystring) return currentQueryItems

  // check for '?' and take values after it
  querystring = /(\?*)([a-zA-Z0-9\=\&\%\$\-\_\.\+\!\*\'\(\)\,]+)/.exec(querystring)[2]

  const split = querystring.split('&')

  split.length &&
    split.map(item => {
      const itemSplit = item.split('=')

      if (itemSplit.length === 2) {
        // if the value contains special char ',' then make it into an array
        const array = decodeURIComponent(itemSplit[1]).split(',')
        if (array && array.length > 1)
          currentQueryItems[itemSplit[0]] = array
        
        // check if key already exists
        else if (itemSplit[0] in currentQueryItems) {
           // convert to array or append to it
           const val = currentQueryItems[itemSplit[0]]
           currentQueryItems[itemSplit[0]] = isArr(val) 
             ? val.push(decodeURIComponent(itemSplit[1])) 
             : [val, decodeURIComponent(itemSplit[1])]        
        }
        else
          currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1])
      }
    })

  return currentQueryItems
}

/**
 * Converts the input object to url querystring
 * @param {Object} obj - object with kvp to convert into a querystring
 * 
 * @returns {String} querystring
 */
export const objToQuerystring = obj => {
  let firstSet
  return reduceObj(obj, (key, value, urlStr) => {
    if(!value) return urlStr

    const useVal = isStr(value) || isNum(value) || isBool(value)
      ? value 
      : isColl(value)
        ? isArr(value) 
          ? value.join(',') 
          : JSON.stringify(value)
        : null
    
    if(!useVal) return urlStr

    urlStr = !firstSet
      ? `?${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`
      : `${urlStr}&${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`
    firstSet = true

    return urlStr
  }, '')
}

/**
 * Checks if the given string is a valid URL
 * Must begin with ftp/http/https
 * @param {String} string - any string to check if it's a valid url
 *
 * @returns {Boolean}
 */
export const isValidUrl = string => {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

  return regexp.test(string)
}