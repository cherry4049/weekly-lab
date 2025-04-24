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

// Question 1: Using Regular Expression Function: `.test()`
// Implement the following functions that utilize regular expressions:
// 1. containDigit - Check if the input string contains at least one digit.
// 2. containCapital - Check if the input string contains at least one uppercase letter.
// 3. validPlate - Check if the input string is a valid license plate with the format: Three uppercase letters followed by three digits.

function containDigit(str) {
  // Write your implementation
  return /\d/g.test(str); 
}

function containCapital(str) {
  // Write your implementation
  return /[A-Z]/g.test(str);
}
console.log(containCapital("Hello World"));

function validPlate(str) {
  // Write your implementation
  return /^[A-Z]{3}\d{3}$/.test(str);
}

const platePattern = "ABc123";
console.log(validPlate(platePattern));
console.log(validPlate("ABC123"));

// Question 2 Using Regular Expression Function `.match()`
// 1. findWordsWithVowels: Return all words containing vowels from a given string.
// 2. findWordsEndingWithDigit: Return all words that end with a digit.
// 3. findWordsWithPattern: Return words that start with [b, k, d, l] and end with 'e'
// [note]: All these questions are case-insensitive, and the returned words should be
// in lowercase. For instance, both "My" and "my" should return "my"
function findWordsWithVowels(str) {
  // Write your implementation
  const wordsWithVowels = str.toLowerCase().match(/\b\w*[aeiou]\w*\b/g);
  return wordsWithVowels || [];
}
console.log(findWordsWithVowels("I have a red shy cat"));

function findWordsEndingWithDigit(str) {
  // Write your implementation
  return str.toLowerCase().match(/\b\w*[0-9]\b/g) || [];
}
console.log(findWordsEndingWithDigit("big ca3t 123 no. 5"));

function findWordsWithPattern(str) {
  // Write your implementation
  return str.match(/\b[bkdl]\w*\b/gi) || [];
}
console.log(findWordsWithPattern("please check this line for error"));
// Question 3: Format an array of product strings into an array of objects with 'id' and 'title' properties.
// The 'id' should be a camel-cased, lowercase version of the product name with special characters removed.
// The 'title' should capitalize each word for display, making it human-readable.
// Usage of Array's map function and the replace method with regular expressions is mandatory.
// Example:
// Input: ['shoes', "women's cloth"]
// Output: [
//    { id: 'shoes', title: 'Shoes' },
//    { id: 'womensCloth', title: "Women's Cloth" }
// ]
function formatProductNames(products) {
  // Write your implementation
  return products.map(product => {
    const id = product
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+(\w)/g, (_, c) => c.toUpperCase())
      .replace(/\s/g, '');

    // const title = product
    //   .split(' ')
    //   .map(word =>word.charAt(0).toUpperCase() + word.slice(1))
    //   .join(' ');
    const title = product.replace(/(^|\s)\w/g, (letter) =>
      letter.toUpperCase()
    );

    return { id, title };
  });
}
console.log(formatProductNames(["shoes", "women's cloth"]));


// Question 4: Write an asynchronous function `getCategories` that retrieves a list of categories from the Fake Store API.
// The function should make a network request to 'https://fakestoreapi.com/products/categories' and return an array of category strings provided by the API.
// This function should use async/await for handling asynchronous operations.
// Note: you can find the api documents at: https://fakestoreapi.com/docs
async function getCategories() {
  // Write your implementation
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories = await response.json();
    return categories; // should be an array of category strings
  } catch (err) {
    console.error("Failed to fetch categories:", err.message);
    return []; //return an empty array if something goes wrong.
  }
}

// Question 5: Write an asynchronous function `getGoodProducts` that retrieves products from a specified category with a rating equal to or higher than a given minimum.
// This function should take two parameters: `category` (a string) and `minRate` (a number).
// Make a network request to 'https://fakestoreapi.com/products/' and filter the results to include only those products that match the category and have a rating greater or equal to `minRate`.
// The function should return an array of objects, each containing 'id', 'rate', 'title', and 'price' of the product.
// You should use high order array function map and filter.
// Note: you can find the api documents at: https://fakestoreapi.com/docs
async function getGoodProducts(category, minRate) {
  // Write your implementation
  try {
    const response = await fetch('https://fakestoreapi.com/products/');
    const products = await response.json();

    //filter and map in one go
    return products
      .filter(
        (product) =>
          product.category === category && product.rating.rate >= minRate
      )
      .map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        rate: product.rating.rate,
      }));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}


module.exports = {
  containDigit,
  containCapital,
  validPlate,
  findWordsWithVowels,
  findWordsEndingWithDigit,
  findWordsWithPattern,
  formatProductNames,
  getCategories,
  getGoodProducts,
};
