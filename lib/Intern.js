// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
/* In addition to Employee's properties and methods, Intern will also have the following:
school
getSchool()
getRole()—overridden to return 'Intern' */
const Employee = require("./Employee");

class Intern extends Employee{
    constructor(school){
        this.school = school;
        super(name, id, email);
    }

    getSchool(){
        return this.school
    }

    getRole(){
        return `Intern`
    }
}

module.exports = Intern();