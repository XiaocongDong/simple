function invokeCallback(callback) {
  callback();
};

invokeCallback(function () {
  console.log('callback is invoked');
});

let x = {
  a: 1,
  b: {
    c: 'cc'
  }
};
console.log(x.b.c);

let arr = [1,2,3];
console.log(arr[4]);