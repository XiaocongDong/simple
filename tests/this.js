let count = 0;
let a = {
  name: 'Hello',
  sayName: function(){
    console.log(this.name);
    function inner() {
      console.log(this.name);
    };
    inner();
  }
};

a.sayName();
