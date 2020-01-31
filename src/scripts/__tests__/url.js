'use strict'

const Url = require('../url')

describe('/url', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('urlGetQuery', () => {

    it('should return the querystring', () => {

      const url = "http://www.google.com?name=daniel&id=1"
      const querystring = Url.urlGetQuery(url)

      expect(querystring === 'name=daniel&id=1').toBe(true)

      const url2 = "https://www.google.com?name=daniel"
      const querystring2 = Url.urlGetQuery(url2)

      expect(querystring2 === 'name=daniel').toBe(true)

    })

    it('should return the querystring given an array querystring', () => {

      const urlCommas = "http://www.google.com?color=red,green,blue"
      const querystringCommas = Url.urlGetQuery(urlCommas)
      expect(querystringCommas === "color=red,green,blue").toBe(true)

    })

    it('should return the querystring given special characters', () => {

      // apostrophe '
      const url = "http://www.google.com?name=daniel'dog&id=1"
      const querystring = Url.urlGetQuery(url)
      expect(querystring === "name=daniel'dog&id=1").toBe(true)

    })

    it('should ignore values that uses unencoded reserved characters', () => {

      // will ignore values after : 
      const url = "http://www.google.com?name=daniel:hello&id=1"
      const querystring = Url.urlGetQuery(url)
      expect(querystring === "name=daniel").toBe(true)

      // will ignore values after |
      const url2 = "http://www.google.com?name=daniel|hello&id=1"
      const querystring2 = Url.urlGetQuery(url2)
      expect(querystring2 === "name=daniel").toBe(true)

    })

    it('should return emptystring with invalid URL', () => {

      const urls = [
        "not a url?name=danielk",
        "?name=daniel"
      ]

      urls.map((url) => {
        expect(Url.urlGetQuery(url) == "").toBe(true)
      })

    })

    it('should return emptystring if querystring not found', () => {

      const urls = [
        "www.google.com?",
        "www.google.com/user/id"
      ]

      urls.map((url) => {
        expect(Url.urlGetQuery(url) == "").toBe(true)
      })
    })

        
  })

  describe('isValidUrl', () => {

    it('should return TRUE for valid urls', () => {

      const urls = [
        "https://google.com?name=daniel&id=1",
        "http://google.com????",
        "https://www.google.uk",
        "https://zsales.zerista.com"
      ]

      urls.map((url) => {
        expect(Url.isValidUrl(url)).toBe(true)
      })
    })

    it('should return FALSE for invalid urls', () => {

      const urls = [
        "hasdfas://google.com?name=daniel&id=1",
        "//google.com????",
        "htp://www.google.uk",
        "zsales.zerista.com"
      ]

      urls.map((url) => {
        expect(Url.isValidUrl(url)).toBe(false)
      })
    })

        
  })

  describe('getUrlQueryObj', () => {

    it('should return emptystring with invalid URL', () => {

      const urls = [
        "not a url?name=danielk",
        "?name=daniel"
      ]

      urls.map((url) => {
        expect(Url.getUrlQueryObj(url) == "").toBe(true)
      })

    })

    it('should return object mapping with array', () => {

      const url = "https://google.com?name=daniel&id=1,2,3,4"
      const obj = Url.getUrlQueryObj(url)
      expect(obj.name).toEqual('daniel')
      expect(obj.id).toEqual(['1', '2', '3', '4'])

    })

    it('should return object mapping prior to the reserved colon char', () => {

      const url = "https://google.com?name=daniel&id=5:2&animal=foo"
      const obj = Url.getUrlQueryObj(url)
      expect(obj.name).toEqual('daniel')
      expect(obj.id).toEqual('5')
      expect(obj.animal).toEqual(undefined)

    })

    it('should return object mapping prior to the reserved pipe char', () => {

      const url = "https://google.com?name=daniel&id=5|2&animal=foo"
      const obj = Url.getUrlQueryObj(url)
      expect(obj.name).toEqual('daniel')
      expect(obj.id).toEqual('5')
      expect(obj.animal).toEqual(undefined)

    })

    it('should return a valid object with querystring items', () => {

      const url = "https://google.com?name=daniel&id=1"
      const obj = Url.getUrlQueryObj(url)
      expect(obj.name).toEqual('daniel')
      expect(obj.id).toEqual('1')

      const url2 = "https://google.com???????test=daniel&&id=5"
      const obj2 = Url.getUrlQueryObj(url2)
      expect(obj2.test).toEqual('daniel')
      expect(obj2.id).toEqual('5')
    })

    it('should return an empty object from url without querystring', () => {

      const url = "https://google.com?"
      const obj = Url.getUrlQueryObj(url)
      expect(obj).toEqual({})

      const url2 = "https://google.com?name"
      const obj2 = Url.getUrlQueryObj(url2)
      expect(obj2).toEqual({})

    })
    
  })

  describe('urlHasQueryKey', () => {

    it('should return FALSE on a invalid URL', () => {

      const urls = [
        "not a url?name=danielk",
        "?name=daniel"
      ]

      urls.map((url) => {
        expect(Url.urlHasQueryKey(url, 'name')).toBe(false)
      })

    })

    it('should return TRUE on a found querystring key', () => {

      const url = "https://google.com?name=daniel&id=1"
      const obj = Url.urlHasQueryKey(url, 'name')
      expect(obj).toBeTruthy()

      const obj2 = Url.urlHasQueryKey(url, 'id')
      expect(obj2).toBeTruthy()

    })

    it('should return FALSE with invalid url or nonexistent query key', () => {

      const url1 = "https://google.com?fakequerystring"
      const obj1 = Url.urlHasQueryKey(url1, 'fakequerystring')
      expect(obj1).toBeFalsy()

      const url2 = "https://google.com/user/help=2"
      const obj2 = Url.urlHasQueryKey(url2, 'help')
      expect(obj2).toBeFalsy()

    })
    
  })

  describe('getUrlObj', () => {

    it('should return with Full object values', () => {

      const url = "https://google.com:8080/path/yo?name=daniel&id=1#some-hash"
      const obj = Url.getUrlObj(url)
      expect(obj).toHaveProperty('url', url)
      expect(obj).toHaveProperty('protocol', 'https')
      expect(obj).toHaveProperty('slash', '://')
      expect(obj).toHaveProperty('host', 'google.com')
      expect(obj).toHaveProperty('port', ':8080')
      expect(obj).toHaveProperty('path', '/path/yo')
      expect(obj).toHaveProperty('query', 'name=daniel&id=1')
      expect(obj).toHaveProperty('hash', 'some-hash')

    })

    it('should return with Some object values', () => {

      const url = "http://www.google.com:8080/?name=daniel&id=1"
      const obj = Url.getUrlObj(url)
      expect(obj).toHaveProperty('url', url)
      expect(obj).toHaveProperty('host', 'www.google.com')
      expect(obj).toHaveProperty('port', ':8080')
      expect(obj).toHaveProperty('query', 'name=daniel&id=1')

    })

    it('should return with no object values', () => {

      const url = "not a valid url input"
      expect(Url.getUrlObj(url)).toEqual({})

    })
  })

  describe('urlAddQuerystring', () => {

    it('should return the URL with querystring given a param object', () => {

      const url = "https://google.com"
      const param = {
        name: 'daniel',
        food: 'pasta'
      }
      const obj = Url.urlAddQuerystring(url, param)
      expect(obj).toEqual('https://google.com?name=daniel&food=pasta')


      const url2 = "https://google.com?id=500"
      const param1 = {
        name: 'daniel',
        food: 'pasta'
      }
      const obj2 = Url.urlAddQuerystring(url2, param1)
      expect(obj2).toEqual('https://google.com?id=500&name=daniel&food=pasta')

    })

    it('should return the URL with querystring given a param string', () => {

      const url = "https://google.com"
      const param = 'test=daniel&id=123'
      const obj = Url.urlAddQuerystring(url, param)
      expect(obj).toEqual('https://google.com?test=daniel&id=123')


      const url2 = "https://google.com?id=500"
      const param1 = 'animal=cat&color=red'
      const obj2 = Url.urlAddQuerystring(url2, param1)
      expect(obj2).toEqual('https://google.com?id=500&animal=cat&color=red')

    })

    it('should return the URL if param object is not valid', () => {

      const url = "https://google.com"
      const param = {
        foo: () => {},
        bar: {}
      }
      const obj = Url.urlAddQuerystring(url, param)
      expect(obj).toEqual('https://google.com')

    })

    it('should return emptystring when no url param', () => {

      const param = {}
      const obj = Url.urlAddQuerystring(null, param)
      expect(obj).toEqual('')

      const param2 = {
        test: 'foo'
      }
      const obj2 = Url.urlAddQuerystring(null, param2)
      expect(obj2).toEqual('')

    })

  })

  describe('urlUpsertQuerystring', () => {

    it('should return the URL with added querystring (no existing querystring)', () => {

      const url = "https://google.com"
      const obj = Url.urlUpsertQuerystring(url, 'id', 5)
      expect(obj).toEqual('https://google.com?id=5')

    })

    it('should return the URL with added querystring (existing querystring)', () => {

      const url = "https://google.com?name=daniel"
      const obj = Url.urlUpsertQuerystring(url, 'id', 5)
      expect(obj).toEqual('https://google.com?name=daniel&id=5')

    })

    it('should replace the existing querystring key', () => {

      // replace key at the beginning
      const url = "https://google.com?name=daniel"
      const obj = Url.urlUpsertQuerystring(url, 'name', 'foooooo')
      expect(obj).toEqual('https://google.com?name=foooooo')

      // replace key in the middle
      const url2 = "https://google.com?name=daniel&id=100&color=red"
      const obj2 = Url.urlUpsertQuerystring(url2, 'id', 50)
      expect(obj2).toEqual('https://google.com?name=daniel&id=50&color=red')

      // replace key at the end
      const url3 = "https://google.com?name=daniel&id=100&color=red"
      const obj3 = Url.urlUpsertQuerystring(url3, 'color', 'yellow')
      expect(obj3).toEqual('https://google.com?name=daniel&id=100&color=yellow')

    })

    it('should return emptystring when no/invalid url provided', () => {

      const obj = Url.urlUpsertQuerystring(null, 'name', 'foooooo')
      expect(obj).toEqual('')

      const obj2 = Url.urlUpsertQuerystring('null', 'name', 'foooooo')
      expect(obj2).toEqual('')

      // invalid url
      const obj3 = Url.urlUpsertQuerystring('google.com', 'name', 'foooooo')
      expect(obj3).toEqual('')

    })

  })

  describe('objToUrlQuerystring', () => {

    it('return a valid querystring from the given object with strings', () => {

      const obj = {
        name: 'daniel',
        food: 'pasta'
      }
      const result = Url.objToUrlQuerystring(obj)
      expect(result).toEqual('name=daniel&food=pasta')

    })

    it('return a valid querystring from the given object with number', () => {

      const obj = {
        name: 'daniel',
        id: 100
      }
      const result = Url.objToUrlQuerystring(obj)
      expect(result).toEqual('name=daniel&id=100')

    })

    it('return a valid querystring from the given object with nested object', () => {

      const obj = {
        name: 'daniel',
        id: {
          foo: 'bar'
        }
      }
      const result = Url.objToUrlQuerystring(obj)
      // just appends the nested object via JSON string
      expect(result).toEqual('name=daniel&id=%7B%22foo%22%3A%22bar%22%7D')

    })

    it('return a valid querystring from the given object with boolean', () => {

      const obj = {
        name: 'daniel',
        alive: true
      }
      const result = Url.objToUrlQuerystring(obj)
      // just appends the nested object via JSON string
      expect(result).toEqual('name=daniel&alive=true')

    })

    it('return a valid querystring from the given object with array', () => {

      const obj = {
        name: 'daniel',
        groups: [1, 2, 3]
      }
      const result = Url.objToUrlQuerystring(obj)
      // just appends the nested object via JSON string
      expect(result).toEqual('name=daniel&groups=%5B1%2C2%2C3%5D')

    })

    it('should return valid inputs only, invalid inputs are excluded', () => {

      const obj = {
        name: 'daniel',
        func: () => {}
      }
      const result = Url.objToUrlQuerystring(obj)
      expect(result).toEqual('name=daniel')

    })

    it('should return emptystring on null or empty obj', () => {

      expect(Url.objToUrlQuerystring({})).toEqual('')
      expect(Url.objToUrlQuerystring(null)).toEqual('')

    })

  })

  describe('querystringToObj', () => {

    it('should return a valid object with querystring items', () => {

      const obj = Url.querystringToObj('?name=daniel&id=5')
      expect(obj.name).toEqual('daniel')
      expect(obj.id).toEqual('5')

      const obj2 = Url.querystringToObj('????????name=daniel&id=5')
      expect(obj2.name).toEqual('daniel')
      expect(obj2.id).toEqual('5')

      const obj3 = Url.querystringToObj('/hello?name=daniel&id=5')
      expect(obj3.name).toEqual('daniel')
      expect(obj3.id).toEqual('5')

    })

    it('should return empty object on invalid querystring', () => {

      const obj3 = Url.querystringToObj('just some random string')
      expect(obj3).toEqual({})

    })
   
  })
})