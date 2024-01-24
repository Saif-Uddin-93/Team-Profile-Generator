// TODO: Write code to define and export the Employee class
/* The first class is an Employee parent class with the following properties and methods:
name
id
email
getName()
getId()
getEmail()
getRole()—returns 'Employee'

The other three classes will extend Employee.*/

class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
        if (!name) {
            throw new Error("You are missing the name.");
          }
          if (!id) {
            throw new Error("You are missing the id.");
          }
          if (!email) {
            throw new Error("You are missing the email.");
          }
    }

    getName(){
        return this.name;
    }
    
    getEmail(){
        return this.email;
    }
    
    getRole(){
        return `Employee`;
    }
}


module.exports = Employee;