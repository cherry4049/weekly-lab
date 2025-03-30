// callback

function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback(name);
}

function farewell(whatever) {
  console.log(`goodbye! ${whatever}`);
}

function test(name) {
  console.log(`${name} owes me ${4*5}`);
}

greet("Tom", farewell);

greet("Alice", test);


// fs.readdir, fs.readFile
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "test");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Scan failed:" + err);
  }
  console.log("List you get:");
  files.forEach((file) => {
    console.log(file);
  });
});

fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// timeout: setTimeout(callback, delay, [arg1, arg2, ...]);
console.log("Start");

setTimeout(() => {
  console.log("My message is delayed by 2 seconds.");
},
2000);

console.log("End");

function greetPerson(name, age) {
  console.log(`Hello,I am ${name}, ${age} years old.`);
}

setTimeout(greetPerson, 3000, "Alice", 30);

