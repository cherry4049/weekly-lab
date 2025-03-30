/**
 * @file questions.js
 * @description This file contains programming exercises for Week 4 of the
 *              Mobile Application Development course. It includes a series of
 *              JavaScript challenges that focus array functions etc.
 *
 *              Students are expected to write their code solutions within this
 *              file in the designated sections for each exercise. The provided
 *              exercises are designed to enhance understanding of basic JavaScript
 *              syntax and problem-solving skills within the context of web and
 *              mobile app development.
 *
 * @author Larry Wen
 * @created [18/03/2024]
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
 * Exercise 1: Callback Function in Asynchronous JavaScript with Error Handling
 *
 * Objective:
 * Enhance understanding of asynchronous operations in JavaScript using callback functions with error handling.
 *
 * Task:
 * Modify the `processData` function to simulate data processing with a callback function handling both success and error scenarios.
 * This function should accept two arguments: `data`, a string, and `callback`, a function. The function should check if the input
 * `data` string contains the word "error". If it does, after a delay, the `callback` should be invoked with an `Error` object
 * and `undefined` result. Otherwise, it should call the `callback` with `null` for the error and the data string transformed
 * to uppercase for the result.
 *
 * Example Usage:
 * processData("fetching data", function(err, result) {
 *   if (err) {
 *     console.error(err.message); // Should log: "process data error"
 *   } else {
 *     console.log(result); // Should output: "FETCHING DATA" after the delay
 *   }
 * });
 *
 * Instructions:
 * - Implement a delay using `setTimeout` of at least 100 milliseconds and less than 150 milliseconds.
 * - If the input `data` includes the word "error", call the `callback` with an `Error` object
 *   (`new Error("process data error")`) and `undefined` for the result.
 * - If the input `data` does not include the word "error", call the `callback` with `null` for
 *   the error and the input string in uppercase for the result.
 *
 * Write your code below:
 */

function processData(data, callback) {
  // Your implementation here
  setTimeout(() => {
    if (data.includes("error")) {
      const err = new Error("process data error");
      callback(err, undefined); // error is passed as 1st arg
    } else {
      callback(null, data.toUpperCase());
    }
  }, Math.random()*50 + 100);
}

//example usage
processData("Hi there", function (whatever, output) {
  if (whatever) {
    console.error(whatever.message);
  } else {
    console.log(output);
  }
});

processData("there is an error", function (however, result) {
  if (however) {
    console.error(however.message);
  } else {
    console.log(result);
  }
});

processData("hello", function(err, result) {
  console.log(result);
}); //1st argument is ignored, result will be outputed regardless there's error or not

/**
 * Exercise 2: Student File Creation with Validation in Node.js
 *
 * Objective:
 * To understand and implement file operations with validation checks in Node.js
 * using the `fs` module.
 *
 * Task:
 * Create a function `createStudentFile` that takes three parameters:
 * - `studentName` (a string in the format "FirstName LastName"),
 * - `studentInfo` (an object with properties `firstName`, `surName`, `age`, and `hobby`),
 * - `callback` (a function that handles the result of the file operation).
 *
 * The function should convert the `studentName` into a filename format
 * (e.g., "Tom Sawyer" -> "tomSawyer.txt"). Before writing the file,
 * check if a file with that name already exists. If it does, invoke the
 * callback with `new Error("File exists")`.
 *
 * If `studentInfo`'s `firstName` and `surName` do not match `studentName`,
 * invoke the callback with `new Error("Wrong Information")`.
 *
 * Otherwise, write the student's information to the file in the format:
 * Name: FirstName LastName
 * Age: age
 * Hobby: hobby1, hobby2
 *
 * Example Usage:
 * createStudentFile('Tom Sawyer', {firstName: 'Tom', surName:'Sawyer',
 * age:10, hobby:['Eating','Adventure']}, function(err) {
 *   if (err) {
 *     console.error(err);
 *   } else {
 *     console.log('File has been created!');
 *   }
 * });
 *
 * Instructions:
 * - Import the `fs` module at the beginning of your file.
 * - Use `fs.writeFile` to asynchronously create the file if validation
 *    checks pass.
 * - Use `fs.existsSync` to check if the file already exists.
 * - The `callback` function should be called with the appropriate error
 *    message or `null` if the operation is successful.
 * - Handle any errors that may occur during the file operation.
 * - Follow Node.js asynchronous conventions and do not use synchronous methods.
 *
 * Write your code below:
 */

const fs = require("fs");
const path = require("path");

/**
 * Creates a student file with validated information.
 * @param {string} studentName - The name of the student in "FirstName LastName" format.
 * @param {Object} studentInfo - An object containing the student's first name, surname, age, and hobbies.
 * @param {Function} callback - A callback function that handles the result of the file operation.
 */
function createStudentFile(studentName, studentInfo, callback) {
  // Your implementation here
  //convert studentName to filename format (e.g., "Tom Sawyer" -> "tomSawyer.txt")
  const nameParts = studentName.split(" "); // Split into an array, e.g. ["Tom", "Sawyer"]
  const firstName = nameParts[0].toLowerCase(); //convert firstname to lowercase
  const surName = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1).toLowerCase();  // Ensure last name starts uppercase
  const fileName = firstName + surName + ".txt";
  const filePath = path.join(__dirname, fileName);
  
  //validate if firstName and SurName match studentName
  if (
    studentInfo.firstName !== studentName.split(" ")[0] ||
    studentInfo.surName !== studentName.split(" ")[1]
  ) {
    return callback(new Error("Wrong Information"));
  }

  //check if the file already exists. Use fs.access() for better performance and non-blocking behavior in async programs.
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      return callback(new Error("File exists"));
    }

  //Use fs.existsSync() only if need a synchronous check (e.g., during script startup).
  /*
  if (fs.existsSync(filePath)) {
    return callback(new Error("File exists"));
  }
  */

    //format student info
    const fileContent = `Name: ${studentInfo.firstName} ${studentInfo.surName}\nAge: ${studentInfo.age}\nHobby: ${studentInfo.hobby.join(", ")}`
  
    //write file asyunchronously
    fs.writeFile(filePath, fileContent, (writeErr) => {
      if (writeErr) {
        return callback(writeErr);
      }
      callback(null);
    });
  });
}

//example usage:
createStudentFile(
  "Tom Sawyer",
  { firstName: "Tom", surName: "Sawyer", age: 10, hobby: ["Eating", "Adventure"] },
  function (err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log("File has been created!");
    }
  }
);
/**
 * Exercise 3: Using Promises in Asynchronous JavaScript
 *
 * Objective:
 * Gain proficiency in handling asynchronous operations using
 * Promises in JavaScript.
 *
 * Task:
 * Create a function `loadUserData` that simulates fetching user
 * data from a database. The function should return a Promise that
 * either resolves with user data after a simulated delay
 * (to mimic database retrieval time) or rejects with an error if
 * the input user ID is invalid (for example, if the ID is not a
 * positive number).
 *
 * Example Usage:
 * loadUserData(1)
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 *
 * Instructions:
 * - The function `loadUserData` should accept a single parameter: `userId`,
 *    which is a number.
 * - If `userId` is a positive number, simulate fetching data by using
 *    `setTimeout` and resolve the Promise with a mock user object, e.g.,
 *    `{ id: userId, name: 'John Doe' }`.
 * - If `userId` is not a positive number, reject the Promise with an
 *    `new Error("Invalid user ID")`. Also delay 100ms.
 * - Use `setTimeout` with a delay (e.g., 100 milliseconds) to simulate
 *    the database call whether resolving or rejecting the Promise.
 *
 * Write your code below:
 */

function loadUserData(userId) {
  // Your implementation here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        const userData = {id: userId, name: "John Doe"};
        resolve(userData); // It passes `userData` (the mock user data) as the resolved result of the Promise.
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 100);
  });
}

// example usage
loadUserData(1)
  .then(data => console.log(data))
  .catch(error => console.error(error));

loadUserData(-1)
  .then(data => console.log(data))
  .catch(error => console.error(error));

/**
 * Exercise 4: Fetching Data with Async/Await
 *
 * Objective:
 * Gain proficiency in handling asynchronous operations using
 * async/await syntax in JavaScript.
 *
 * Task:
 * Create an async function `fetchUserDetails` that simulates
 * retrieving user details from an API. The function should use
 * a Promise to simulate fetching data and should be handled using
 * async/await syntax. If the input userID is positive, the function
 * should resolve with user details after a simulated delay. If the
 * userID is not positive, the function should throw an error.
 *
 * Example Usage:
 * (async () => {
 *   try {
 *     const userDetails = await fetchUserDetails(1);
 *     console.log(userDetails);
 *   } catch (error) {
 *     console.error(error);
 *   }
 * })();
 *
 * Instructions:
 * - The function `fetchUserDetails` should be an async function that
 *    accepts a single parameter: `userId`.
 * - Use a Promise that resolves with mock user details (e.g.,
 *    `{ id: userId, name: 'Jane Doe' }`) if `userId` is positive.
 *    It should reject with a new Error("Invalid user ID") if
 *    `userId` is not positive. Also with 100ms delay.
 * - Use `setTimeout` within the Promise to simulate a delay (e.g.,
 *    100 milliseconds) in fetching the data.
 * - In the function, use await to wait for the Promise to settle,
 *    and handle the result or error appropriately.
 *
 * Write your code below:
 */

async function fetchUserDetails(userId) {
  // Your implementation here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        const userDetails = { id: userId, name: "Jane Doe"};
        resolve(userDetails);
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 100);
  });
}

//example usage:
(async () => {
  try {
    const userDetails = await fetchUserDetails(1);
    console.log(userDetails);
  } catch (error) {
    console.error(error)
  }

  try {
    const userDetail = await fetchUserDetails(-1);
    console.log(userDetails);
  } catch (error) {
    console.error(error);
  }
})();

/**
 * Exercise 5: Check Tic-Tac-Toe Game State
 *
 * Objective:
 * Create a function to evaluate the current state of a Tic-Tac-Toe board.
 *
 * Task:
 * Write a function called `checkState` that assesses the state of a
 * Tic-Tac-Toe game. The input is an array of 9 elements representing
 * the cells of the game board, in row-major order (first three elements
 *  are the first row, and so on). Each element can be 'X', 'O', or ''
 * (empty string for unoccupied cells). The function should analyze the
 * board and return the current game state as a string.
 *
 * Rules:
 * - If all elements are '', return 'X to play'.
 * - If there is one more 'X' than 'O', return 'O to play'.
 * - If there are three 'X's or 'O's in a row, a column, or diagonally,
 *    return 'X wins' or 'O wins' respectively.
 * - If all 9 cells are filled and there's no winner, return 'It is a tie'.
 *
 * Example Usage:
 * checkState(['X', 'O', 'X', 'X', 'O', 'O', '', '', '']) // return 'X to play'
 *
 * Instructions:
 * - Analyze the input array to determine the current game state based on
 *    the rules provided.
 * - Implement the logic to check for win conditions (three in a row,
 *    column, or diagonal) for both 'X' and 'O'.
 * - Ensure your function covers all possible game states and returns the
 *    correct game state message.
 *
 * Write your code below:
 */

function checkState(board) {
  // Your implementation here

   //define winning combinations
   const winningCombinations = [
    [0, 1, 2], //top row
    [3, 4, 5], //middle row
    [6, 7, 8], //bottom row
    [0, 3, 6], //left column
    [1, 4, 7], //middle column
    [2, 5, 8], //right column
    [0, 4, 8], //top-left to bottom-right diagonal
    [2, 4, 6], //top-right to bottom-left diagonal
  ];

  //check for a winner
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return `${board[a]} wins`;
    }
  }

  //check if the board is full and no winner (a tie)
  if (!board.includes('')) {
    return 'It is a tie';
  }

  //count the number of 'X' or 'O'
  const xCount = board.filter(cell => cell === 'X').length;
  const oCount = board.filter(cell => cell === 'O').length;

  //if X has more moves, it's O's turn
  if (xCount > oCount) {
    return 'O to play';
  }

  // otherwise, it's X's turn
  return 'X to play';
}

//example usage:
console.log(checkState(['X', 'O', 'X', 'X', 'O', 'X', 'X', '', '']));

module.exports = {
  processData,
  createStudentFile,
  loadUserData,
  fetchUserDetails,
  checkState,
};
