// import {inquirer} from './node_modules/inquirer/lib/inquirer';
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//const inquirer = require("inquirer");
const path = require("path");
const fs = require('fs/promises');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { finished } = require("stream");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

//const addEmployeeResponses=['Engineer', 'Intern', 'Finished']

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
        name: 'engineerGithub',
        message: "What is the engineer's Github username?",
    }],
    intern: [{
        type: 'input',
        name: 'internSchool',
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
    managers: [
    //     name: '',
    //     id: '',
    //     email: '',
    //     officeNumber: '',
    ],
    engineers: [
    //     name: '',
    //     id: '',
    //     email: '',
    //     officeNumber: '',
    ],
    interns: [
    //     name: '',
    //     id: '',
    //     email: '',
    //     officeNumber: '',
    ],
}

const promptUser = (prompts)=> {
    return inquirer.prompt(prompts)
}

async function addEmployee(role, index){
    // array index to keep track of number of employees.
    // add employee answers to employee object.
    // let extraQuestion;
    // switch (role) {
    //     case 'manager':
    //         extraQuestion = "officeNumber";
    //         break;
    //     case 'engineer':
    //         extraQuestion = "github";
    //         break;
    //     case 'intern':
    //         extraQuestion = "school";
    //         break;
    //     case 'finished':
    //         break;
    //     default:
    //         break;
    // }
    const answers = await promptUser(employeePrompts(role));
    const additionalQuestion = await promptUser(employeeQuestion[role]);
    // answers[extraQuestion] = await promptUser(employeeQuestion[role]);
    answers = {...answers, ...additionalQuestion};
    employees[role][index] = answers//[answers.name]
    // return answers
}

async function notFinished(index=0){
    const role = await promptUser(addEmployeePrompt);
    if (role.role != "Finished"){
        // add Employee!
        addEmployee(role.role,index);
        notFinished(index + 1);
    }
}

// instantiate Manager
// const manager = new Manager();

// function to initialize program
const init = async () => {
try {
    // prompt user expects an array of objects
    // const managerQ = await promptUser(employeePrompts('Manager'));
    // managerQ['officeNumber'] = await promptUser(employeeQuestion['Manager']);

    // const managerQ = addEmployee("Manager");
    // manager(managerQ.name, managerQ.id, managerQ.email, managerQ.officeNumber);
    // console.log(manager.getOfficeNumber);
    // finalResponsesExample['manager']={
    //     ...managerQ,
    //     ...officeNumber,
    // };

    await addEmployee('Manager', 0)
    
    await notFinished();

    console.log(employees);
    // await addEmployee();
    
    // switch (answers.addEmployee) {
    //     case 'Engineer':
    //         const engineerResponse = await promptUser(engineerPrompt);
    //         answers.push(engineerResponse);
    //         break;
    //     case 'Intern':     
    //         const internResponse = await promptUser(internPrompt);
    //         answers.push(internResponse);
    //         break;
    //     case 'Finished':
    //         break;
    //     default:
    //         break;
    // }
    // const md = generateMarkdown(answers);

    // await fs.writeFile('generated readme.md', md);

    // console.log('Successfully wrote to readme.md');
    } catch (err) {
        console.log(err);
    }
};

init();

// let finalResponsesExample=[
//     {
//         role: '',
//         name: '',
//         id: '',
//         email: '',
//         githubSchoolOffice: '',
//     },
//     {
//         role: '',
//         name: '',
//         id: '',
//         email: '',
//         githubSchoolOffice: '',
//     },
//     {
//         role: '',
//         name: '',
//         id: '',
//         email: '',
//         githubSchoolOffice: '',
//     },
//     {
//         role: '',
//         name: '',
//         id: '',
//         email: '',
//         githubSchoolOffice: '',
//     },
// ]