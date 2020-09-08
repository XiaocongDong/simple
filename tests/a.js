let a = 1;
while(true) {
  if (a < 100) {
    console.log(a);
    a += 1 + 2 * 3 * (1 + 1);
  } else {
    break;
  };
};

let b = 1;
function outer() {
  if (b < 20) {
    b = b+1;
    while(true) {
      break;
    };
  } else {
    console.log('esle ', b);
    return;
  };
  console.log(b);
  outer();
};
outer();
