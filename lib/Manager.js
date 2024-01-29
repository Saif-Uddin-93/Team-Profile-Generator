// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
/* In addition to Employee's properties and methods, Manager will also have the following:
officeNumber
getRole()—overridden to return 'Manager' */

const Employee = require("./Employee");

class Manager extends Employee{
    constructor(officeNumber){
        this.officeNumber = officeNumber;
        super(name, id, email);
    }

    getOfficeNumber(){
        return this.officeNumber
    }
    
    getRole(){
        return `Manager`
    }
}

module.exports = Manager();