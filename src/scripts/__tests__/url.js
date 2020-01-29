'use strict'

const Url = require('../url')

describe('/url', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('urlGetQuery', () => {

    it('should return the querystring', () => {

      const url = "www.google.com?name=daniel&id=1"
      const querystring = Url.urlGetQuery(url)

      expect(querystring === 'name=daniel&id=1').toBe(true)

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

    it('should return a valid object with querystring items', () => {

      const url = "https://google.com?name=daniel&id=1"
      const obj = Url.getUrlParamObj(url)
      expect(obj.name).toEqual('daniel')
      expect(obj.id).toEqual('1')

      const url2 = "https://google.com???????test=daniel&&id=5"
      const obj2 = Url.getUrlParamObj(url2)
      expect(obj2.test).toEqual('daniel')
      expect(obj2.id).toEqual('5')
    })

    it('should return an empty object from url without querystring', () => {

      const url = "https://google.com?"
      const obj = Url.getUrlParamObj(url)
      expect(obj).toEqual({})

      const url2 = "https://google.com?name"
      const obj2 = Url.getUrlParamObj(url2)
      expect(obj2).toEqual({})

    })
    
  })

  describe('urlHasQueryKey', () => {

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
})