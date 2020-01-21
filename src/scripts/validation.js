import { mapObj } from './object'
/** 
 * @function
 *  Validates each key-value entry in argObj using the validator functions in validators with matching keys. 
 *  For any failures, validate will console.error the reason.
 *  @param { Object } argObj - object, where keys are the name of the argument to validate, and value is its value
 *  @param { Object } validators - object, where keys match the argument and values are predicate functions (return true/false and are passed the arg with the same key). 
 *     - Use the `$default` key to define a default validator, which will validate any argument that doesn't have a custom validator defined.
 *  @returns - an entry with two values [ success, results ]. 
 *     - success: { Boolean } that is true if all arguments passed their validators, false otherwise
 *     - results: { Object } that holds the validation results for each argument, keyed by the same keys as in argObj. For each
 *                result object, the properties are: { success, key, value, validator, reason }.
 *  @example 
 *    const elements = {}
 *    const name = 'michael'
 *    const address = '12345 E. Street'
 *    const [ isValid, results ] = validate(
 *      { elements, name, address },
 *      { elements: isArr, $default: isStr }
 *    )
 *    console.log(isValid) // false
 *    console.log(results.elements.success) // false
 */
export const validate = (argObj, validators={}) => {
  const validationCaseEntries = Object.entries(argObj)

  // if no default or custom validator set for an arg, just assert it is valid
  const defaultValidator = () => true

  // validate each argument
  const validationResults = validationCaseEntries.map(
    ([argName, argValue]) => validateArgument(
      argName,
      argValue,
      validators[argName] || validators['$default'] || defaultValidator
    )
  )

  // reduce the argument validation results into a single object of form { success, cases }.
  // success is true if all arguments passed their validators. Cases holds each argument's validation results.
  const { success, cases } = validationResults.reduce(
    validationReducer,
    { success: true, cases: {} }
  )

  return [ success, cases ]
}


/**
 * Helper for `validate`. Validates a single value given a validator
 * @param {*} key 
 * @param {*} value 
 * @param {Function} validator 
 * @returns an object of form { success, reason }
 */
const validateArgument = (key, value, validator) => {
  const success = validator(value)

  // if validator is a named function, use its name. If it is an inline anonymous arrow function, its name
  // matches the argument key and it has no useful/descriptive name, so just stringify it
  const shouldStringifyValidator = !validator.name || (validator.name === key) || (validator.name === '$default')
  const validatorString = shouldStringifyValidator ? validator.toString() : validator.name

  const reason = success
    ? null
    : [
      `Argument "${key}" with value `, 
      value, 
      ` failed validator: ${validatorString}.`
    ] 
   
  return { success, key, value, validator, reason }
}

/**
 * Helper for `validate`. Reduces validations into a single object of form { success, cases }
 * @param {*} finalResult 
 * @param {*} nextValidation 
 */
const validationReducer = (finalResult, nextValidation) => {
  // error log the reasons for failed validation, if any
  !nextValidation.success && console.error(...nextValidation.reason)

  return {
    success: finalResult.success && nextValidation.success,
    cases: {
      ...finalResult.cases,
      [nextValidation.key]: nextValidation
    }
  }
}
