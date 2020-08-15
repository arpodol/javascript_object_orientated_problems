function myBind(func, context){
  let partialArgs = [].slice.apply(arguments, [2]);
  return function(){
    let remainingArgs = [].slice.apply(arguments)
    let mergedArgs = partialArgs.concat(remainingArgs);
    return func.apply(context, mergedArgs);
  }
}

function add(a, b){
  return a + b;
}

let addFive = myBind(add, null, 5);
console.log(addFive(3))
