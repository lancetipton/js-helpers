import { get, set } from '../collection'

/**
 * Checks if a value already exists in `obj` at `path`. If it does, it returns
 * `obj` unmodified. If it does not, then it creates that path whose value is `value`.
 * @param {Object} obj 
 * @param {string} path 
 * @param {*} value 
 */
export const ensureExists = (obj, path, value) => {
  const existingValue = get(obj, path)
  return existingValue
    ? obj
    : set(obj, path, value)
}