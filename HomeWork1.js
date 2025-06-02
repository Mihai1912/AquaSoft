// We will learn, or where applicable, review fundamental TypeScript concepts (which extends JavaScript by adding static typing and features), used in current projects:

// 1.1. ES6 - Methods (examples, explanations).
// 1.2. Difference between var, let, and const.
// 1.3. Spread operator.
// 1.4. Objects: How to iterate over an object, deep copy.
// 1.5. Arrays - accessor, iteration, and mutator methods (which they are, how to use them).
// 1.6. Promises. Callback.
// 1.7. Async. Await.
// 1.8. Closures.
// 1.9. useState. useRef.

import cloneDeep from 'lodash/cloneDeep.js';

// 1.1 ES6 - Methods

// ES6 introduced several new features and methods that enhance JavaScript's capabilities. Here are some key features:

// - Arrow Functions: Shorter syntax for writing functions.
const add = (a, b) => a + b; // Arrow function
console.log(`Arrow Function: 2 + 3 = ${add(2, 3)}`); // Arrow Function: 2 + 3 = 5

// - Template Literals: Allows for multi-line strings and string interpolation.
const name = 'Alice';
const greeting = `Hello, ${name}!`; // Template literal
console.log(`Template Literal: ${greeting}`); // Template Literal: Hello, Alice!

// - Destructuring Assignment: Allows unpacking values from arrays or properties from objects into distinct variables.
const person1 = { name: 'Bob', age: 25 };
const { name: personName, age: personAge } = person1; // Destructuring
console.log(`Destructuring: Name = ${personName}, Age = ${personAge}`); // Destructuring: Name = Bob, Age = 25

// - Default Parameters: Allows setting default values for function parameters.
const greet = (name = 'Guest') => `Hello, ${name}!`; // Default parameter
console.log(`Default Parameter: ${greet()}`); // Default Parameter: Hello, Guest!

// - Rest Parameters: Allows a function to accept an indefinite number of arguments as an array.
const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0); // Rest parameter
console.log(`Rest Parameter: Sum of 1, 2, 3 = ${sum(1, 2, 3)}`); // Rest Parameter: Sum of 1, 2, 3 = 6

// - Classes: Introduces a more structured way to create objects and handle inheritance.
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}
class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}
const dog = new Dog('Rex'); // Class instantiation
dog.speak(); // Rex barks.


// 1.2 var

// var is function-scoped or globally scoped, meaning if declared inside a function, it is accessible throughout the function, and if declared outside any function, it is accessible globally.
var x = 1;

function exampleVar() {
    console.log(x); // 1
    console.log(y); // y is hoisted, but not initialized, will print undefined
    var y = 2;
    console.log(y); // 2
    if (true) {
        var y = 3; // overrides the previous y
        console.log(y); // 3
    }
    console.log(y); // 3
}

// console.log(y); // ReferenceError: y is defined only within the function scope
console.log(x); // 1, x is globally accessible

exampleVar();

// 1.2 let

// let is block-scoped, meaning it is only accessible within the block it is defined in (e.g., inside a loop or an if statement).
let a = 1;

function exampleLet() {
    console.log(a); // 1
    // console.log(b); // b is not defined yet, will throw ReferenceError because let has temporal dead zone
    let b = 2;
    console.log(b); // 2
    if (true) {
        let b = 3; // creates a new b in this block scope
        console.log(b); // 3
    }
    console.log(b); // 2, refers to the b defined in the function scope
}

// console.log(b); // ReferenceError: b is defined only within the function scope
console.log(a); // 1, a is globally accessible

exampleLet();

// 1.2 const

// const is also block-scoped like let, but it cannot be reassigned after its initial assignment. It must be initialized at the time of declaration.
const c = 1;
// c = 2; // TypeError: Assignment to constant variable.

const obj = { key: 'value' };
console.log(obj); // { key: 'value' }
obj.key = 'newValue'; // This is allowed, as we are not reassigning the object itself, just modifying its property.
console.log(obj); // { key: 'newValue' }

// obj = { newKey: 'newValue' }; // TypeError: Assignment to constant variable, as we are trying to reassign the object itself.


// 1.3 Spread Operator
// The spread operator (...) allows an iterable (like an array or object) to be expanded in places where zero or more elements are expected, such as in function calls, array literals, or object literals.

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArray = [...arr1, ...arr2]; // Combines two arrays
console.log(combinedArray); // [1, 2, 3, 4, 5, 6]

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const combinedObject = { ...obj1, ...obj2 }; // Combines two objects, obj2 properties will overwrite obj1 properties if they have the same key
console.log(combinedObject); // { a: 1, b: 3, c: 4 }

const copyOfObj1 = { ...obj1 }; // Creates a shallow copy of obj1
const overrideObj1 = { ...obj1, b: 5}; // Creates a new object with obj1 properties, but overrides the value of b
console.log(overrideObj1); // { a: 1, b: 5 }

// 1.4 Objects: Iteration and Deep Copy
// To iterate over an object, you can use for...in loop or Object.keys(), Object.values(), or Object.entries() methods.

const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

// Iterating using for...in loop
for (const key in person) {
    if (Object.hasOwnProperty.call(person, key)) {
        console.log(`${key}: ${person[key]}`);
    }
}

// Iterating using Object.keys()
Object.keys(person).forEach(key => {
    console.log(`${key}: ${person[key]}`);
});

// Iterating using Object.values()
Object.values(person).forEach(value => {
    console.log(value);
});

// Iterating using Object.entries()
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Deep copy of an object can be done using JSON methods or libraries like Lodash.
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
} 

// This method works well for simple objects, but it won't work for objects with functions, undefined, or special types like Date, Map, Set, etc.
const original = {
    name: 'Alice',
    age: 25,
    hobbies: ['reading', 'gaming'],
    address: {
        city: 'Wonderland',
        zip: '12345'
    }
};

console.log("\nJson deep copy example:");
const copied = deepCopy(original);
console.log(copied); // { name: 'Alice', age: 25, hobbies: [ 'reading', 'gaming' ], address: { city: 'Wonderland', zip: '12345' } }
copied.address.city = 'New City'; // Modifying the copied object won't affect the original
console.log(original.address.city); // 'Wonderland', original remains unchanged


// Example usage of Lodash deep copy
console.log("\nLodash deep copy example:");
const lodashCopied = cloneDeep(original);
console.log(lodashCopied); // { name: 'Alice', age: 25, hobbies: [ 'reading', 'gaming' ], address: { city: 'Wonderland', zip: '12345' } }
lodashCopied.address.city = 'New City'; // Modifying the copied object won't affect the original
console.log(original.address.city); // 'Wonderland', original remains unchanged

// 1.5 Arrays - accessor, iteration, and mutator methods

// Accessor methods return a new array or value without modifying the original array.
const numbers = [1, 2, 3, 4, 5, 3];

if (numbers.includes(3)) {
    console.log("Array includes 3");
}

const indexOfThree = numbers.indexOf(3); // Returns the index of the first occurrence of 3
console.log(`Index of 3: ${indexOfThree}`); // Index of 3: 2

const lastIndexOfThree = numbers.lastIndexOf(3); // Returns the index of the last occurrence of 3
console.log(`Last index of 3: ${lastIndexOfThree}`); // Last index of 3: 5

const joinedString = numbers.join(', '); // Joins array elements into a string
console.log(`Joined string: ${joinedString}`); // Joined string: 1, 2, 3, 4, 5, 3

const slicedArray = numbers.slice(1, 4); // Returns a shallow copy of a portion of the array
console.log(`Sliced array: ${slicedArray}`); // Sliced array: 2, 3, 4

const concatenatedArray = numbers.concat([6, 7]); // Combines two arrays
console.log(`Concatenated array: ${concatenatedArray}`); // Concatenated array: 1, 2, 3, 4, 5, 3, 6, 7

const tostringArray = numbers.toString(); // Converts the array to a string
console.log(`Array to string: ${tostringArray}`); // Array to string: 1,2,3,4,5,3

const elementAtIndexTwo = numbers.at(2); // Returns the element at index 2
console.log(`Element at index 2: ${elementAtIndexTwo}`); // Element at index 2: 3
// .at() supports negative indices, e.g., numbers.at(-1) returns the last element

// Iteration methods allow you to iterate over the array without modifying it.  
numbers.forEach((num, index) => {
    console.log(`Element at index ${index}: ${num}`);
});

const mappedArray = numbers.map(num => num * 2); // Creates a new array with each element multiplied by 2
console.log(`Mapped array: ${mappedArray}`); // Mapped array: 2, 4, 6, 8, 10, 6

const filteredArray = numbers.filter(num => num > 3); // Creates a new array with elements greater than 3
console.log(`Filtered array: ${filteredArray}`); // Filtered array: 4, 5

const reducedValue = numbers.reduce((acc, num) => acc + num, 0); // Reduces the array to a single value (sum in this case)
console.log(`Reduced value (sum): ${reducedValue}`); // Reduced value (sum): 18

const someCondition = numbers.some(num => num > 4); // Checks if at least one element satisfies the condition
console.log(`Some condition (greater than 4): ${someCondition}`); // Some condition (greater than 4): true

const everyCondition = numbers.every(num => num > 0); // Checks if all elements satisfy the condition
console.log(`Every condition (greater than 0): ${everyCondition}`); // Every condition (greater than 0): true

const findElement = numbers.find(num => num > 3); // Returns the first element that satisfies the condition
console.log(`First element greater than 3: ${findElement}`); // First element greater than 3: 4

const findIndexElement = numbers.findIndex(num => num > 3); // Returns the index of the first element that satisfies the condition
console.log(`Index of first element greater than 3: ${findIndexElement}`); // Index of first element greater than 3: 3

// Mutator methods modify the original array.
numbers.push(6); // Adds an element to the end of the array
console.log(`After push: ${numbers}`); // After push: 1,2,3,4,5,3,6

numbers.pop(); // Removes the last element from the array
console.log(`After pop: ${numbers}`); // After pop: 1,2,3,4,5,3

numbers.unshift(0); // Adds an element to the beginning of the array
console.log(`After unshift: ${numbers}`); // After unshift: 0,1,2,3,4,5,3

numbers.shift(); // Removes the first element from the array
console.log(`After shift: ${numbers}`); // After shift: 1,2,3,4,5,3

numbers.splice(2, 1); // Removes one element at index 2
console.log(`After splice: ${numbers}`); // After splice: 1,2,4,5,3
numbers.splice(2, 0, 3); // Inserts 3 at index 2 without removing any elements
console.log(`After splice insert: ${numbers}`); // After splice insert: 1,2,3,4,5,3

numbers.reverse(); // Reverses the order of the elements in the array
console.log(`After reverse: ${numbers}`); // After reverse: 3,5,4,3,2,1

numbers.sort((a, b) => a - b); // Sorts the array in ascending order
console.log(`After sort: ${numbers}`); // After sort: 1,2,3,3,4,5

numbers.fill(0, 1, 3); // Fills elements from index 1 to 3 with 0
console.log(`After fill: ${numbers}`); // After fill: 1,0,0,3,4,5

numbers.copyWithin(1, 3); // Copies elements from index 3 to index 1
console.log(`After copyWithin: ${numbers}`); // After copyWithin: 1,3,4,3,4,5

// 1.6 Promises. Callbacks

// Callbacks are functions passed as an argument to another function, to be executed later.

function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: 'John Doe' };
        console.log('Data fetched'); // Simulating data fetch
        callback(data); // Call the callback function with the fetched data
    }, 1000);
}

fetchData((data) => {
    console.log('Fetched data:', data); // Fetched data: { id: 1, name: 'John Doe' }
});

// Promises are objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value.

function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: 'John Doe' };
            console.log('Data fetched'); // Simulating data fetch
            resolve(data); // Resolve the promise with the fetched data
        }, 1000);
    });
}

fetchDataPromise()
    .then(data => {
        console.log('Fetched data:', data); // Fetched data: { id: 1, name: 'John Doe' }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// 1.7 Async/Await
// Async/Await is a syntactic sugar built on top of Promises, making asynchronous code look more like synchronous code.

async function fetchDataAsync() {
    try {
        const data = await fetchDataPromise(); // Wait for the promise to resolve
        console.log('Fetched data:', data); // Fetched data: { id: 1, name: 'John Doe' }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchDataAsync();

// 1.8 Closures

// A closure is a function that retains variables from its enclosing scope, even after the outer function has finished executing.

function createContor(){
    let count = 0; // This variable is enclosed by the inner function
    return function() {
        count += 1; // The inner function can access and modify the count variable
        console.log(`Count: ${count}`);
    };
}

const counter = createContor();
counter(); // Count: 1
counter(); // Count: 2