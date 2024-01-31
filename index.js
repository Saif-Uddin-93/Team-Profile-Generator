// import {inquirer} from './node_modules/inquirer/lib/inquirer';
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

async function checkOutputFolder(){
    //if(!fs.existsSync(OUTPUT_DIR)) 
    fs.stat(OUTPUT_DIR, (err, stats)=>{
        if(!err){
            console.log("folder already exists")
        }
        else {
            console.log("folder does not exist")
            fs.mkdir(OUTPUT_DIR, (err, path)=>{
                if(!err) console.log("output folder created");
                else console.log("error making directory");
            });
        }
    })
}

async function writeTeamHTML(team){
    fs.writeFile(outputPath, render(team), ()=>{
        console.log("created team.html file")
    });
}

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

let employees = [] // {
//     manager: [
//     //     name: '',
//     //     id: '',
//     //     email: '',
//     //     officeNumber: '',
//     ],
//     engineer: [
//     //     name: '',
//     //     id: '',
//     //     email: '',
//     //     github: '',
//     ],
//     intern: [
//     //     name: '',
//     //     id: '',
//     //     email: '',
//     //     school: '',
//     ],
// }

const promptUser = (prompts)=> {
    return inquirer.prompt(prompts)
}

async function addEmployee(role){
    // array index to keep track of number of employees.
    // add employee answers to employee object.
    let answers = await promptUser(employeePrompts(role));
    const additionalQuestion = await promptUser(employeeQuestion[role]);
    //let index = employees[role].length;
    //let index = employees.length;
    answers = {...answers, ...additionalQuestion};
    //employees[role][index] = answers//[answers.name]
    switch(role){
        case "manager":
            // employees[role][index] = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            employees.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber))
            break;
        case "engineer":
            // employees[role][index] = new Engineer(answers.name, answers.id, answers.email, answers.github)
            employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github))
            break;
        case "intern":
            // employees[role][index] = new Intern(answers.name, answers.id, answers.email, answers.school)
            employees.push(new Intern(answers.name, answers.id, answers.email, answers.school))
            break;
        default:
            break;
    }
    // return answers
}

async function notFinished(){
    const role = await promptUser(addEmployeePrompt);
    // promptUser(addEmployeePrompt)
    //     .then((role) => {
                // everything in here will wait for promptUser(addEmployeePrompt) to complete
    //     })

    // promptUser(addEmployeePrompt);
    // everything in here will not wait for promptUser(addEmployeePrompt); to complete

    // await promptUser(addEmployeePrompt);
    // everything in here will wait for promptUser(addEmployeePrompt) to complete

    if (role.role != "finished"){
        // add Employee!
        await addEmployee(role.role);
        console.log("Current team:");
        console.log(employees);
        await notFinished();
    }
}

// function to initialize program
const init = async () => {
try {
    await addEmployee('manager', 0)
    
    await notFinished();

    await checkOutputFolder();

    await writeTeamHTML(employees);

    console.log("Final team:");
    console.log(employees);

    } catch (err) {
        console.log(err);
    }
};

init();