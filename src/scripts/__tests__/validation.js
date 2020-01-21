const { validate } = require('../validation')
const { isArr } = require('../array')
const { isStr } = require('../string')
const { isNum } = require('../number')

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
    const orig = console.error
    console.error = jest.fn()

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

    console.error = orig
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
    const orig = console.error
    console.error = jest.fn()

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

    console.error = orig
  })

})