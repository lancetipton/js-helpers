/** @module url */

'use strict'

import { reduceObj, isObj } from './object'

/**
 * Turns a given url into an object of querystring items
 * @param {String} url
 * 
 * @returns {Object} 
 */
export const getUrlQueryObj = url => {
  const currentQueryItems = {}
  const params = urlGetQuery(url)
  if(!params) return currentQueryItems
  
  const split = params.split('&')
  split.length &&
    split.map(item => {
      const itemSplit = item.split('=')
      if (itemSplit.length === 2) {
        currentQueryItems[decodeURIComponent(itemSplit[0])] = decodeURIComponent(itemSplit[1])
      }
    })

  return currentQueryItems
}

export const objToUrlParams = obj => {
  let firstSet
  return reduceObj(obj, (key, value, urlStr) => {
    if(!value) return urlStr

    const useVal = isStr(value) ? value : isObj(value) ? JSON.stringify(value) : null
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
 * @param {String} url 
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

export const urlUpcertParam = (url, key, value) => {
  url = url || ''
  const re = new RegExp('(\\?|&)'+ key +'=[^&]*' )
  const param = `${key}=${encodeURIComponent(value)}`

  return re.test(url)
    ? url.replace(re, `${$1}${param}`)
    : addParam(url, null, null, param)
}

export const urlAddParam = (url, key, value, param) => {
  url = url || ''
  param = param || `${key}=${encodeURIComponent(value)}`
  url.indexOf('?') === -1 && (url += '?')
  url.indexOf('=') !== -1 && (url += '&')

  return `${url}${param}`
}

/**
 * Checks whether a given querystring key exists in the url
 * @param {String} url 
 * @param {String} key 
 * 
 * @returns {Boolean}
 */
export const urlHasQueryKey = (url, key) => {
  const regex = new RegExp('(\&)*(' + key + '=)', 'g')
  return regex.test(urlGetQuery(url))
}

/**
 * Gets the raw querystring excluding the first '?'
 * @param {String} url
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
 * @param {String} string
 *
 * @returns {Boolean}
 */
export const isValidUrl = string => {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

  return regexp.test(string)
}