# Simple
> Life is short, keep it simple.

**Simple** is a simple programming language (subset of JavaScript) powered by TypeScript.

## Grammar
### Data Types
Currently simple support the following data types:
* number
* string
* boolean
* array
* object
* function

### Variable Declaration
Using `let` to declare variable and `const` to declare constant:
```javascript
let n = 10; // integer
let b = true; // boolean
let s = "string"; // string value
let f = function(x, y, z) {return x + y * z}; // function
let a = [1, 2, 3, {1, 2, 3}, "hi"]; // array
let o = {
  name: 'sean',
  age: 27
}; // object
```
### Operators
Support almost all of the mathematical and logic operators.
```javascript
1+1
1-1
1*1
1/1

a+=1
a-=1
a*=1
a/=1

a++
a--

a = 1 + (1 * 2 + 4)/2

a||b
a&&b
```
### Function Declaration
```javascript
function sum(x, y) {
  return x + y;
};
```
Lexical Scope
```javascript
function sumGenerator() {
  let sum = 1;

  function add(number) {
    sum += number;
    return sum;
  };

  return add;
}
const sum = sumGenerator();
for(let i = 0; i < 10; i++) {
  console.log(sum(i));
};
```
Functional programming:
```javascript
function invokeCallback(callback) {
  callback()
}

invokeCallback(function () {
  console.log('callback is invoked')
})
```
### Object
```javascript
let x = {
  a: 1,
  b: {
    c: 'cc'
  }
};
console.log(x.b.c);
```
### Array
```javascript
let arr = [1, 2, 3, 4];
let length = arr.length - 1;
console.log(arr[0]);
console.log(arr[2]);
```
### If condition
#### if
```javascript
let grade = 10;
if (grade >= 90) {
  console.log('you are a good student');
} else if (grade >= 60){
  console.log('you are not that bad');
} else {
  console.log('stop playing computer game!');
};
```
#### while
```javascript
let i = 0;
while(true) {
  console.log('this is a infinite loop');
};
```
### for
```javascript
for(let i = 0; i < 10; i++) {
  console.log(i);
};
```
### this binding
```javascript
const person = {
  name: "Hello world",
  sayName: function() {
    console.log(this.name); // "Hello world"

    function inner() {
      console.log(this.name); // undefined
    };

    inner();
  }
};
person.sayName();
```
