function objectsEqual(objectOne, objectTwo) {
  let equality = true;
  if (Object.keys(objectOne).length !== Object.keys(objectTwo).length) {
    return false;
  }

  Object.keys(objectOne).forEach(property => {
    if(objectOne[property] !== objectTwo[property]) {
      equality = false;
    }
  });

  Object.keys(objectTwo).forEach(property => {
    if(objectOne[property] !== objectTwo[property]) {
      equality = false;
    }
  });
  return equality;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
