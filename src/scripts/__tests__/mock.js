const Mock = require('../mock')

describe('Mock', () => {
  describe('mockConsole', () => {
    it ('should return a function that resets all the console mocks', () => {
      const original = console.error
      console.error = jest.fn()
      const reset = Mock.mockConsole(['error'])
      reset()
      console.error('hello')
      expect(console.error).toBeCalled()
      console.error = original
    })

    it ('should mock out the functions', () => {
      const reset = Mock.mockConsole(['error', 'log'])
      console.error('err')
      console.log('note')
      expect(console.error).toBeCalled()
      expect(console.log).toBeCalled()
      reset()
    })
  })
})