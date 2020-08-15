function createStudent(name, year){
  return {
    name: name,
    year: year,
    courses: [],
    info: function(){
      console.log(this.name + ' is a ' + year + ' year student')
    },
    listCourses: function(){
      console.log(this.courses)
    },
    addCourse: function(course){
      this.courses.push(course);
    },
    addNote: function(code, note){
      this.courses.forEach(course => {
        if (course.code === code) {
          if(course.note) {
            course.note += `; ${note}`;
          } else {
            course.note = note;
          }
        }
      })
    },
    viewNotes: function(){
      this.courses.forEach(course => {
        if (course.note) {
          console.log(course.name + ': ' + course.note);
        }
      })
    },
    updateNote(code, note){
      this.courses.forEach(course => {
        if (course.code === code) {
          if(course.note) {
            course.note = note;
          }
        }
      })
    },
  }
}

let school = {
  students: [],
  validYears: ['1st', '2nd', '3rd', '4th', '5th'],
  addStudent: function(name, grade){
    if (this.validYears.includes(grade)) {
      let student = createStudent(name, grade);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year.')
    }
  },
  enrollStudent: function(student, course, code) {
    student.addCourse({name: course, code:code});
  },
  addGrade: function(student, name, grade){
    student.courses.forEach(course => {
      if(course.name === name){
        course.grade = grade;
      }
    });
  },
  getReportCard: function(student){
    student.courses.forEach(course => {
      console.log(`${course.name}: ${course.grade ? course.grade : 'In progress'}`)
    })
  },
  courseReport: function(name){
    let total = 0;
    let sum = 0;
    let grades = [];
    this.students.forEach(student => {
      student.courses.forEach(course => {
        if (course.name === name && course.grade) {
          total += 1;
          sum += course.grade;
          grades.push({name: student.name, grade: course.grade})
        }
      })
    })
    if (grades.length === 0){
      return undefined;
    } else {
      console.log(`=${name} Grades=`);
      grades.forEach(grade => {
        console.log(`${grade.name}: ${grade.grade}`)
      })
      console.log('---');
      console.log(`Course Average: ${sum/total}`)
    }

  },
}
let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 'Math', 91);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 'Math', 93);
school.addGrade(qux, 'Advanced Math', 90);


console.log(school);
console.log(foo);
console.log(bar);
console.log(qux);
school.getReportCard(foo);
school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');
