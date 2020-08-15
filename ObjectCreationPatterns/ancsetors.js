// name property added to make objects easier to identify

Object.prototype.ancestors = function(){
  let protoChain = [];
  let proto = Object.getPrototypeOf(this);
  while (proto !== Object.prototype){
    protoChain.push(proto.name);
    proto = Object.getPrototypeOf(proto);
  }
  protoChain.push('Object.prototype');
  return protoChain;

};


var foo = {name: 'foo'};
var bar = Object.create(foo);
bar.name = 'bar';
var baz = Object.create(bar);
baz.name = 'baz';
var qux = Object.create(baz);
qux.name = 'qux';


console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']
