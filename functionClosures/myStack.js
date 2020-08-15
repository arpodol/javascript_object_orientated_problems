function newStack(){
  var stack = [];
  return {
    push: function(value){
      stack.push(value);
    },
    pop: function(){
      return stack.pop();
    },
    printStack: function(){
      stack.forEach(function(value){
        console.log(value);
      })
    },
  };
}

coolStack = newStack();
coolStack.stack;
coolStack.push(5);
coolStack.printStack();
//console.log(coolStack);
