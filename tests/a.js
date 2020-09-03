function sumGenerator() {
  let sum = 0;

  return function (i) {
    sum += i
    return sum
  };
};

const sum = sumGenerator();
for(let i = 0; i <= 10; i++) {
  console.log(sum(i));
};
