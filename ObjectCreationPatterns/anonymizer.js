let Account = (function(){
  function randomString(length){
    var charString = '';
    for(let i = 0; i < length; i += 1){
      let randomNum = Math.floor(Math.random() * 62);
      charString += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ1234567890'[randomNum];
    }
    return charString;
  };

  return {
    init: function(newEmail, newPassword, newFirstName, newLastName){
      let email = newEmail;
      let password = newPassword;
      let firstName = newFirstName;
      let lastName = newLastName;

      this.reanonymize = function(testPassword){
        if (testPassword === password){
          this.displayName = randomString(16);
          return true;
        } else {
          return 'Invalid Password';
        }
      };

      this.reanonymize(password);


      this.firstName = function(testPassword){
        if (testPassword === password){
          return firstName;
          return true;
        } else {
          return 'Invalid Password';
        }
      };

      this.lastName = function(testPassword){
        if (testPassword === password){
          return lastName;
          return true;
        } else {
          return 'Invalid Password';
        }
      };

      this.email = function(testPassword){
        if (testPassword === password){
          return email;
          return true;
        } else {
          return 'Invalid Password';
        }
      };

      this.resetPassword = function(testPassword, newPassword){
        if (testPassword === password){
          password = newPassword;
          return true;
        } else {
          return 'Invalid Password';
        }
      };

      return this;
    },
  }
})();


var fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

var displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false
console.log(fooBar.displayName )
var bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'baz' but should log foo.
console.log(fooBar.email('abc'));                  // 'baz@qux.com' but should 'foo@bar.com'
