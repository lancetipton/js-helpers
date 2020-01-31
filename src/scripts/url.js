/** @module url */

'use strict'

import { reduceObj, isObj } from './object'
import { isStr } from './string'
import { isNum } from './number'
import { isBool } from './boolean'
import { isColl } from './collection'

/**
 * Turns a given url into an object of querystring items
 * @param {String} url - url to pull the query params from
 * 
 * @returns {Object} 
 */
export const getUrlQueryObj = url => {
  const params = urlGetQuery(url)
  return querystringToObj(params)
}

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
        currentQueryItems[decodeURIComponent(itemSplit[0])] = decodeURIComponent(itemSplit[1])
      }
    })

  return currentQueryItems
}

/**
 * Converts the input object to url querystring
 * @param {Object} obj - object with kvp to convert into a querystring
 * 
 * @returns {String} url querystring
 */
export const objToUrlQuerystring = obj => {
  let firstSet
  return reduceObj(obj, (key, value, urlStr) => {
    if(!value) return urlStr

    const useVal = isStr(value) || isNum(value) || isBool(value)
      ? value 
      : isObj(value) || isColl(value)
        ? JSON.stringify(value) 
        : null
    
    if(!useVal) return urlStr

    urlStr = !firstSet
      ? `${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`
      : `${urlStr}&${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`
    firstSet = true

    return urlStr
  }, '')
}

/**
 * Parse the given url to a url object
 * @param {String} url - complete url. i.e 'https://google.com/stuff'
 * 
 * @returns {Object} {url, protocol, slash, host, port, path, query, hash}
 */
export const getUrlObj = url => {
  const urlRegEx = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
  const result = urlRegEx.exec(url || window.location.href)
  const urlData = {}

  // return empty on possible invalid input
  if (!result)
    return urlData
  
  const keys = ['url', 'protocol', 'slash', 'host', 'port', 'path', 'query', 'hash']

  // map each keys to the regex result values
  keys.forEach((key, i) => {

    typeof result[i] === "undefined" 
      ? urlData[key] = "" 
        // append special character infront of 'port' and 'slash' values
      : (key === "port" || key === "slash") 
        ? urlData[key] = `:${result[i]}`
        : urlData[key] = result[i]

  })

  urlData['path'] = "/" + urlData['path']
  return urlData
}

/**
 * create or update the url with the kvp
 * @param {String} url - complete url you want to upsert to
 * @param {String} key - key name of your query item
 * @param {String|Number} value - value of your query item
 * 
 * @returns {String} updated querystring url
 */
export const urlUpsertQuerystring = (url, key, value) => {

  // verify url
  if (!isValidUrl(url)) return ''

  const regex = new RegExp('(\/?|\/&)'+ key +'=[^&]*')
  const param = `${key}=${encodeURIComponent(value)}`

  // either replace or add
  return regex.test(url)
    ? url.replace(regex, `${param}`)
    : urlAddQuerystring(url, param)
}

/**
 * Adds a querystring to a given url. pass in either an object of kvp or a string of the full querystring
 * @param {String} url - complete url you want to add querystring items to
 * @param {String|Object} param - can be the raw querystring or kvp
 * 
 * @returns {String} - url with added querystring
 */
export const urlAddQuerystring = (url, param) => {

  // verify url
  if (!isValidUrl(url)) return ''

  let querystring = ''
  if (isObj(param)) {
    Object.entries(param).forEach(([key, value], index) => {

      // validate that value is a string or a number, use reduce
      if (!isStr(value) && !isNum(value)) return 

      querystring += `${key}=${encodeURIComponent(value)}`
      // append '&' if there's more keys to add in
      if (index < Object.keys(param).length - 1) querystring += '&'
    })

  }
  else if (isStr(param)) {
    querystring = param
  }

  if (querystring !== '') {
    url.indexOf('?') === -1 && (url += '?')
    url.indexOf('=') !== -1 && (url += '&')
  }

  return `${url}${querystring}`
}

/**
 * Checks whether a given querystring key exists in the url
 * @param {String} url - complete url that you want to check against
 * @param {String} key - key to be checked against the url
 * 
 * @returns {Boolean}
 */
export const urlHasQueryKey = (url, key) => {
  const regex = new RegExp('(\&)*(' + key + '=)', 'g')
  return regex.test(urlGetQuery(url))
}

/**
 * Gets the raw querystring excluding the first '?'
 * @param {String} url - url string  i.e 'https://zerista.com?id=5'
 * 
 * @returns {String} raw querystring only. i.e: 'name=daniel&id=1'
 */
export const urlGetQuery = url => {
  const queryString = /\?[a-zA-Z0-9\=\&\%\$\-\_\.\+\!\*\'\(\)\,]+/.exec(url)

  return queryString ? decodeURIComponent(queryString[0].replace(/\+/g,' ').replace('?','')) : ''
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