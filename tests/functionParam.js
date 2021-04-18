function createCounter() {
  let a = 0;
  return function() {
      a = a + 1;
      return a;
  };
};

let c1 = createCounter();
let c2 = createCounter();
let c3 = createCounter();
console.log(c1());
console.log(c1());
console.log(c2());
console.log(c2());
console.log(c3());

for(let i = 1; i<10; i++) {
  let i = 1;
  console.log(i)
}
