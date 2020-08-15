var temperatures = [53, 86, 12, 43];

function average() {
  var total = 0;
  var i;
  for (i = this.length - 1; i >= 0; i -= 1) {
    total += this[i];
  }

  return total / this.length;
}

console.log(average.call(temperatures));           // => 48.5
