/** 
 * @function
 *  Validates each key-value entry in argObj using the validator functions in validators with matching keys. 
 *  For any failures, validate will console.error the reason.
 *  @param { Object } argObj - object, where keys are the name of the argument to validate, and value is its value
 *  @param { Object } validators - object, where keys match the argument and values are predicate functions. 
 *     - Accept the associated arg as input and return true or false for validation.
 *     - Use the `$default` key to define a default validator. Validate will use isStr if this isn't defined by user
 *  @returns - true if all arguments passed their validators, false otherwise
 *  @example 
 *    const elements = {}
 *    const name = 'michael'
 *    const address = '12345 E. Street'
 *    validate(
 *      {elements, name, address},
 *      {elements: isArr, $default: isStr}
 *    )
 *   // would return false and console.error "Argument 'elements' with value {} failed validator: isArr"
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

  // reduce the argument validation results into a single object of form { success, message }.
  // success is true if all arguments passed their validators. Message is the accumulation of each validator's message.
  const { success, reasons } = validationResults.reduce(
    validationReducer,
    { success: true, reasons: [] }
  )

  // error log the reasons for failed validation, if any
  !success && reasons.map(reason => console.error(...reason))

  return success
}


/**
 * Helper for `validate`. Validates a single value given a validator
 * @param {*} key 
 * @param {*} value 
 * @param {Function} validator 
 * @returns an object of form { success, reason }
 */
const validateArgument = (key, value, validator) => {
  const isValid = validator(value) 

  return {
    success: isValid, 
    reason: !isValid && [
      `Argument "${key}" with value`, 
      value, 
      // if validator is a named function, use its name. If it is an inline anonymous arrow function, it has no name, so just stringify it
      `failed validator: ${validator.name || validator.toString()}.`
    ]
  }
}

/**
 * Helper for `validate`. Reduces validations into a single object of form { success, reasons }
 * @param {*} finalResult 
 * @param {*} nextValidation 
 */
const validationReducer = (finalResult, nextValidation) => {
  return {
    success: finalResult.success && nextValidation.success,
    reasons: nextValidation.success
      ? finalResult.reasons
      : [ ...finalResult.reasons, nextValidation.reason ]
  }
}
