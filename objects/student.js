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

foo = createStudent('Foo', '1st');
foo.info();

foo.listCourses();
[];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
[{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();

foo.addNote(102, 'Difficult subject');
foo.viewNotes();

foo.updateNote(101, 'Fun course');
foo.viewNotes();
