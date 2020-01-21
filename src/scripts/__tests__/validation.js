const { validate } = require('../validation')
const { isArr } = require('../array')
const { isStr } = require('../string')
const { isNum } = require('../number')

const { mockConsole } = require('jestlib')

describe('validate', () => {
  it ('should validate all conditions, returning true if all are valid', () => {
    const x = 3
    const y = 'hello' 
    const z =  []

    const [ isValid ] = validate({ x, y, z }, { 
      x: x => x > 0, 
      y: isStr,
      z: isArr
    })
    expect(isValid).toBe(true)
  })

  it ('should return false for a failure, and it should error log that failure', () => {
    const resetMocks = mockConsole(['error'])

    const x = 3
    const y = 1
    const z = 'wow' 

    const [ isValid ] = validate({ x, y, z }, { 
      x: x => x < 0, 
      y: isStr,
      z: isArr
    })

    
    expect(isValid).toBe(false)
    expect(console.error).toHaveBeenCalledTimes(3)

    resetMocks()
  })

  it ('should work with the $default parameter', () => {
    const x = 3
    const y = 1
    const z = 'wow' 

    const [ isValid ] = validate({ x, y, z }, { 
      $default: isNum,
      z: isStr,
    })

    expect(isValid).toBe(true)
  })

  it ('should return failed cases object', () => {
    const resetMocks = mockConsole(['error'])

    const x = 3
    const y = 1
    const z = 'wow' 

    const [ isValid, results ] = validate({ x, y, z }, { 
      x: x => x < 0, 
      y: isStr,
      z: isArr
    })

    expect(results.x.success).toBe(false)
    expect(results.x.reason.length > 0).toBe(true)
    
    expect(isValid).toBe(false)
    expect(console.error).toHaveBeenCalledTimes(3)

    resetMocks()
  })

  it ('should be configurable by the options argument', () => {
    const resetMocks = mockConsole(['error'])
    const x = 3
    const y = 1
    const z = 'wow' 

    validate(
      { x, y, z },
      { x: x => x < 0 },
      { logs: false }
    )
    expect(() => validate({ x }, { x: x => x < 0 }, { throws: true })).toThrow()

    expect(console.error).toHaveBeenCalledTimes(0)
    resetMocks()
  })

  it ('should handle global configuration of options', () => {
    validate.setOptions({ throws: true, logs: false, prefix: '123' })    
    const x = 1
    expect(() => validate({ x }, { x: x => x < 0 }, { throws: true })).toThrow()

    validate.resetOptions()
    
    const options = { prefix: '123' }
    validate.setOptions(options)    

    const resetMocks = mockConsole(['error'])
    validate({ x }, { x: isArr })
    expect(console.error).toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(options.prefix, "Argument \"x\" with value ", 1, " failed validator: isArr." )

    resetMocks()
  })
})