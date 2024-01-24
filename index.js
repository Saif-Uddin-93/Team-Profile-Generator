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


// TODO: Write Code to gather information about the development team members, and render the HTML file.

//const addEmployeeResponses=['Engineer', 'Intern', 'Finished']

// array of questions for user

const addEmployeePrompt = {
    type: 'list',
    name: 'role',
    message: "Do you want to add an employee?",
    choices: ['Engineer', 'Intern', 'Finished'],
}

const managerPrompt = [
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the office number?",
    },
]

const engineerPrompt = [
    {
        type: 'input',
        name: 'engineerGithub',
        message: "What is the engineer's Github username?",
    },
];

const internPrompt = [
    {
        type: 'input',
        name: 'internSchool',
        message: "What is the intern's school?",
    },
];

const employeePrompts = (role)=>[
    {
        type: 'input',
        name: `${role}Name`,
        message: `What is the ${role}'s name?`,
    },
    {
        type: 'input',
        name: `${role}Id`,
        message: `What is the ${role}'s ID?`,
    },
    {
        type: 'input',
        name: `${role}Email`,
        message: `What is the ${role}'s email address?`,
    },
];

const promptUser = (prompts)=> {
    return inquirer.prompt(prompts)
}

async function addEmployee(role){
    switch (role.role) {
        case 'Engineer':
            const engineerResponse = await promptUser(engineerPrompt);
            answers[`employeeResponse${index}`]=engineerResponse[0];
            break;
        case 'Intern':
            const internResponse = await promptUser(internPrompt);
            answers[`employeeResponse${index}`]=internResponse[0];
            break;
        case 'Finished':
            break;
        default:
            break;
    }
    // console.log(answers);
    // addEmployee(answers, index+1);
}

// function to initialize program
const init = async () => {
try {
    const managerResponse = await promptUser(employeePrompts('manager'));
    finalResponsesExample['manager']=managerResponse;
    
    const role = await promptUser([addEmployeePrompt]);

    const employeeResponse = await promptUser(employeePrompts(role.role));
    employeeResponse['role']=role.role
    const employeeExtraQuestion = addEmployee(role.role)
    finalResponsesExample[role.role]=employeeResponse;
    
    console.log(answers);

    await addEmployee(answers);
    
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


let finalResponsesExample=[
    {
        role: '',
        name: '',
        id: '',
        email: '',
        githubSchoolOffice: '',
    },
    {
        role: '',
        name: '',
        id: '',
        email: '',
        githubSchoolOffice: '',
    },
    {
        role: '',
        name: '',
        id: '',
        email: '',
        githubSchoolOffice: '',
    },
    {
        role: '',
        name: '',
        id: '',
        email: '',
        githubSchoolOffice: '',
    },
]