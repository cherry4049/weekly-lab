/**
 * @file questions.js
 * @description This file contains programming exercises for Week 6 of the
 *              Mobile Application Development course. It includes a series of
 *              JavaScript challenges that focus regular expression and fetch API.
 *
 *              Students are expected to write their code solutions within this
 *              file in the designated sections for each exercise. The provided
 *              exercises are designed to enhance understanding of basic JavaScript
 *              syntax and problem-solving skills within the context of web and
 *              mobile app development.
 *
 * @author Larry Wen
 * @created [27/04/2024]
 *
 * INSTRUCTIONS:
 * - Follow the prompts for each exercise and write your code in the specified
 *   areas.
 * - Run the provided tests after completing the exercises to check your work.
 * - Do not modify the structure of the file or the provided code snippets.
 * - Seek assistance if you encounter difficulty understanding the exercises or
 *   implementing the solutions.
 */

/**
 * Question 1: Abbreviates a full name to its initials.
 *
 * @param {string} name - A string representing a person's full name, which could be in two possible formats:
 * 1. A first and last name (e.g., "Tom Sawyer")
 * 2. A first, middle, and last name (e.g., "Tom William Sawyer")
 *
 * The function returns the name in an abbreviated format, where the first name is reduced to an initial,
 * the middle name (if any) to an initial followed by a period, and the last name is written out fully.
 * Extra whitespace at the beginning or end of the input name will be trimmed, and any excessive spaces
 * between names will be normalized to a single space.
 *
 * @returns {string} Abbreviated version of the name in the format "Lastname, F." or "Lastname, F. M.",
 * depending on whether a middle name is present.
 *
 * The function uses a regular expression in a single replace operation to achieve the abbreviation.
 *
 * Examples:
 * abbreviateName("  Tom Sawyer  ") returns "Sawyer, T."
 * abbreviateName("Tom William Sawyer") returns "Sawyer, T. W."
 * abbreviateName("Tom     Sawyer") returns "Sawyer, T." (Note the normalization of spaces)
 */

function abbreviateName(name) {
  // Implementation using regular expression
  return name
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^(\w)(?:\w*)\s+(?:(\w)(?:\w*)\s+)?(\w+)$/, (_, f, m, l) => {
      return m ? `${l}, ${f}. ${m}.` : `${l}, ${f}.`;
    });
}

/**
 * Question 2: Validate Australian Mobile Numbers
 *
 * @param {string} number - The mobile number to validate.
 * @returns {boolean} Returns true if the number is a valid Australian mobile number, otherwise false.
 *
 * This function checks if the input string is a valid Australian mobile number.
 * Valid Australian mobile numbers:
 * - Start with '04' which can optionally be enclosed in parentheses like '(04)'.
 * - Followed by 8 digits that can be formatted in various ways including spaces or dashes.
 *
 * The function should handle cases with spaces or hyphens between groups of digits and different groupings.
 *
 * Examples:
 * isValidAustralianMobile("0412345678") returns true
 * isValidAustralianMobile("(04)12345678") returns true
 * isValidAustralianMobile("04 1234 5678") returns true
 * isValidAustralianMobile("0412 345 678") returns true
 * isValidAustralianMobile("0412-345-678") returns true
 * isValidAustralianMobile("0412 3456 78") returns true
 * isValidAustralianMobile("04123456789") returns false (Too many digits)
 * isValidAustralianMobile("0312345678") returns false (Incorrect prefix)
 */
function isValidAustralianMobile(number) {
  // Implementation using regular expression
  const cleaned = number.replace(/[\s-]/g, '');
  return /^(\(04\)|04)\d{8}$/.test(cleaned);
}

/**
 * Question 3: Function Reflection and Dynamic Creation
 *
 * Function 1: describeFunction(func)
 * - Accepts a function as an argument.
 * - Returns a string description that includes the function's name and the number of parameters it accepts.
 *
 * Function 2: createFunction(name, length)
 * - Dynamically creates and returns a function with the specified name and a designated number of parameters.
 * - The parameters of the newly created function are not required to have explicit names or functionality.
 * - This part is optional. If you wish to attempt this challenge, enable the corresponding test case
 *   in ex.test.js by removing the 'skip' keyword from the relevant test case.
 *
 * Examples:
 * - describeFunction(function abc(x, y) {}) should return "abc is a function expecting 2 parameters."
 * - The function created by createFunction('test', 3) should have the name 'test' and accept 3 parameters.
 */

function describeFunction(func) {
  // Your implementation here
  const name = func.name || 'anonymous';
  const paramCount = func.length;
  return `${name} is a function expecting ${paramCount} parameters.`;
}

function createFunction(name, length) {
  // Your implementation here (optional exercise)
  const params = Array.from({ length }, (_, i ) => `arg${i + 1}`).join(', ');
  const fnCode = `return function ${name}(${params}) {}`;
  return new Function(fnCode)();
}
/**
 * Question 4: Using Function Methods - Apply and Call
 *
 * This task tests your understanding of the 'apply' and 'call' methods, which allow for the invocation of
 * functions with a specified 'this' context and arguments.
 *
 * Function: invokeWithApplyAndCall(func, context, argsArray)
 * - Takes a function 'func', a context object 'context', and an array of arguments 'argsArray'.
 * - First, use the 'apply' method to invoke 'func' with 'context' as 'this' and 'argsArray' as the arguments list.
 * - Then, use the 'call' method to invoke 'func' again with 'context' as 'this' and individual elements of 'argsArray'
 *   passed as separate arguments.
 * - Return an array with the results of the two invocations.
 *
 * Example:
 * - The function passed calculates the sum of three numbers.
 * - invokeWithApplyAndCall(function(x, y, z) { return x + y + z; }, {dummy: true}, [1, 2, 3])
 *   should return [6, 6] because both 'apply' and 'call' should give the same result.
 */
function invokeWithApplyAndCall(func, context, argsArray) {
  // Your implementation here
  const resultWithApply = func.apply(context, argsArray);
  const resultWithCall = func.call(context, ...argsArray);
  return [resultWithApply, resultWithCall];
}

/**
 * Question 5: Understanding Function Binding with Bind
 *
 * This task tests your understanding of the 'bind' method, which creates a new function with a specified 'this' context
 * and optionally, predefined initial arguments.
 *
 * Function: bindFunction(func, context, ...boundArgs)
 * - Takes a function 'func', a context object 'context', and a list of arguments 'boundArgs'.
 * - Uses the 'bind' method to create a new function from 'func' with 'context' as 'this' and 'boundArgs' as initial arguments.
 * - Returns the new function.
 *
 * Example:
 * - The function passed adds two numbers.
 * - const boundAdd = bindFunction(function(x, y) { return x + y; }, null, 5);
 * - boundAdd(10) should return 15, as the first argument is bound to 5.
 */
function bindFunction(func, context, ...boundArgs) {
  // Your implementation here
  return func.bind(context, ...boundArgs);
}

module.exports = {
  abbreviateName,
  isValidAustralianMobile,
  describeFunction,
  createFunction,
  invokeWithApplyAndCall,
  bindFunction,
};
