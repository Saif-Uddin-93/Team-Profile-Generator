// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
/* In addition to Employee's properties and methods, Engineer will also have the following:
github—GitHub username
getGithub()
getRole()—overridden to return 'Engineer' */
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(github){
        this.github = github;
        super(name, id, email);
    }

    getGithub(){
        return this.github
    }
    
    getRole(){
        return `Engineer`
    }
}