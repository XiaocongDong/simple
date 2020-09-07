let a = 1;
while(true) {
  if (a < 2) {
    console.log(a);
    a += 1;
  } else {
    break;
  };
};

let b = 1;
function outer() {
  if (b < 2) {
    b = b+1;
  } else {
    console.log('esle ', b);
    return;
  };
  console.log(b);
  outer();
};
outer();
