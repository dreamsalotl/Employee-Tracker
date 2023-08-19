const inquirer = require("inquirer");
const util = require("util");

process.stdout.write("\u001b[2J\u001b[0;0H");

const showMenu = () => {
  const questions = [
    {
      type: "list",
      name: "selection",
      message:
        "Welcome to the employee database. Please select from the options below:",
      choices: [
        {
          name: "View All Departments",
          value: 0,
        },
        {
          name: "View All Roles",
          value: 1,
        },
        {
          name: "View All Employees",
          value: 2,
        },
        {
          name: "Add A Department",
          value: 3,
        },
        {
          name: "Add A Role",
          value: 4,
        },
        {
          name: "Add An Employee",
          value: 5,
        },
        {
          name: "Update Employee Role",
          value: 6,
        },
        {
          name: "Log Off",
          value: 7,
        },
      ],
    },
  ];
  return inquirer.prompt(questions);
};

const mainMenu = async () => {
  await showMenu().then((answers) => {
    if (answers.selection === 0) {
      return console.log("You chose option 1!");
    } else if (answers.selection === 1) {
      return console.log("You chose option 2!");
    } else if (answers.selection === 2) {
      return console.log("You chose option 3!");
    } else if (answers.selection === 3) {
      return console.log("You chose option 4!");
    } else if (answers.selection === 4) {
      return console.log("You chose option 5!");
    } else if (answers.selection === 5) {
      return console.log("You chose option 6!");
    } else if (answers.selection === 6) {
      return console.log("You chose option 7!");
    } else if (answers.selection === 7) {
      return console.log("You chose option 8!");
    }
  });
};

mainMenu();
