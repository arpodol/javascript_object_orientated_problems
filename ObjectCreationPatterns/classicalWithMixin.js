function Person(firstName, lastName, age, gender){
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function(){
  return this.firstName + ' ' + this.lastName;
};

Person.prototype.eat = function(){
  console.log('Eating');
}

Person.prototype.communicate = function(){
  console.log('Communicating');
}

Person.prototype.sleep = function(){
  console.log('Sleeping');
}

function Doctor(firstName, lastName, age, gender, specialization){
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
}


Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;
Doctor.prototype.diagnose = function(){
  console.log('Diagnosing');
}

function Professor(firstName, lastName, age, gender, subject){
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}


Professor.prototype = Object.create(Person.prototype);
Professor.prototype.teach = function(){
  console.log('Teaching');
}
Professor.prototype.constructor = Professor;


function Student(firstName, lastName, age, gender, degree){
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.study = function(){
  console.log('Studying');
}
Student.prototype.constructor = Student;

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree){
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.research = function(){
  console.log('Researching')
}
GraduateStudent.prototype.constructor = GraduateStudent;

function Professional(){
  this.invoice = function(){console.log(`${this.fullName()} is Billing Customer`)};
  this.payTax = function(){console.log(`${this.fullName()} Paying taxes`)}
}

function extend(obj, mixin){
  Object.keys(mixin).forEach(function(prop){
    obj[prop] = delegate(obj, mixin, prop);
  })
  return obj;
}

function delegate(obj, mixin, prop){
  let parameters = [].splice.call(arguments, 3);
  return function(){
    return mixin[prop].apply(obj, parameters);
  }
}

professional = new Professional();
var doctor = extend(new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics'), professional);
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'S
doctor.diagnose();                         // logs 'Diagnosing'

var professor = extend(new Professor('foo', 'bar', 21, 'gender', 'Systems Engineering'), professional);
console.log(professor instanceof Person);     // logs true
console.log(professor instanceof Professor);  // logs true
professor.eat();                              // logs 'Eating'
professor.communicate();                      // logs 'Communicating'
professor.sleep();                            // logs 'Sleeping'
console.log(professor.fullName());            // logs 'foo bar'
professor.teach();                            // logs 'Teaching'

doctor.invoice();                          // logs 'foo bar is Billing customer'
doctor.payTax();                           // logs 'foo bar Paying taxes'

professional.invoice = function() {
  console.log(this.fullName() + ' is Asking customer to pay');
};

doctor.invoice();                          // logs 'foo bar is Asking customer to pay'
professor.invoice();                       // logs 'foo bar is Asking customer to pay'
professor.payTax();                        // logs 'foo bar Paying taxes'
