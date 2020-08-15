var myObject = {
  oink: 4,
}

let test = Object.create(myObject);

console.log(test)
console.log(myObject)
console.log(test.oink)
