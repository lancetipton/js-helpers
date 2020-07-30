const Coll = require('..')

describe('ensureExists', () => {

  let expected;
  beforeEach(() => {
    expected = { a: { b: 2 } }
  })

  it('should create path in object if it doesn\'t exist', () => {
    const obj = {}
    const result = Coll.ensureExists(obj, ['a', 'b'], 2)
    expect(result).toBe(obj)
    expect(result).toEqual(expected)
  })

  it ('should do nothing if the path exists', () => {
    const obj = Coll.ensureExists(expected, ['a', 'b'], 5)
    expect(obj).toBe(expected)
    expect(obj).toEqual(expected)
  })

  it ('should overwrite values that do not match path', () => {
    const obj = Coll.ensureExists({ a: 5 }, ['a', 'b'], 2)
    expect(obj).toEqual(expected)
  })

})
