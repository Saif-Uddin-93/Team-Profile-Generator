// import {inquirer} from './node_modules/inquirer/lib/inquirer';
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require('fs/promises');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { finished } = require("stream");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// array of questions for user
const addEmployeePrompt = [{
    type: 'list',
    name: 'role',
    message: "Do you want to add an employee?",
    choices: ['engineer', 'intern', 'finished'],
}]

const employeeQuestion = {
    manager: [{
        type: 'input',
        name: 'officeNumber',
        message: "What is the office number?",
    }],
    engineer: [{
        type: 'input',
        name: 'github',
        message: "What is the engineer's Github username?",
    }],
    intern: [{
        type: 'input',
        name: 'school',
        message: "What is the intern's school?",
    }]
}

const employeePrompts = (role)=>[
    {
        type: 'input',
        //name: `${role}Name`,
        name: `name`,
        message: `What is the ${role}'s name?`,
    },
    {
        type: 'input',
        //name: `${role}Id`,
        name: `id`,
        message: `What is the ${role}'s ID?`,
    },
    {
        type: 'input',
        //name: `${role}Email`,
        name: `email`,
        message: `What is the ${role}'s email address?`,
    },
];

let employees = {
    manager: [
    //     name: '',
    //     id: '',
    //     email: '',
    //     officeNumber: '',
    ],
    engineer: [
    //     name: '',
    //     id: '',
    //     email: '',
    //     github: '',
    ],
    intern: [
    //     name: '',
    //     id: '',
    //     email: '',
    //     school: '',
    ],
}

const promptUser = (prompts)=> {
    return inquirer.prompt(prompts)
}

async function addEmployee(role){
    // array index to keep track of number of employees.
    // add employee answers to employee object.
    let answers = await promptUser(employeePrompts(role));
    const additionalQuestion = await promptUser(employeeQuestion[role]);
    let index = employees[role].length;
    answers = {...answers, ...additionalQuestion};
    //employees[role][index] = answers//[answers.name]
    switch(role){
        case "manager":
            employees[role][index] = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            break;
        case "engineer":
            break;
        case "intern":
            break;
        default:
            break;
    }
    // return answers
}

async function notFinished(){
    const role = await promptUser(addEmployeePrompt);
    if (role.role != "finished"){
        // add Employee!
        await addEmployee(role.role);
        // console.log(employees);
        await notFinished();
    }
}

// function to initialize program
const init = async () => {
try {
    await addEmployee('manager', 0)
    
    await notFinished();

    console.log(employees);

    } catch (err) {
        console.log(err);
    }
};

init();