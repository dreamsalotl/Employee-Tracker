const mysql = require ("mysql2");
const logo = require ("./logo");
const inquirer = require ("inquirer");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'DragonRoost',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

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
    logo();
    showMenu().then((answers) => {
      if (answers.selection === 0) {
        return viewDepts();
      } else if (answers.selection === 1) {
        return viewRoles();
      } else if (answers.selection === 2) {
        return viewEmployees();
      } else if (answers.selection === 3) {
        return addDept();
      } else if (answers.selection === 4) {
        return addRole();
      } else if (answers.selection === 5) {
        return addEmployee();
      } else if (answers.selection === 6) {
        return updateRole();
      } else if (answers.selection === 7) {
          process.stdout.write("\u001b[2J\u001b[0;0H");
          return process.exit();
      }
    });
  };


const viewDepts = async () => {
    db.query('SELECT * FROM department', function (err, results) {
        process.stdout.write("\u001b[2J\u001b[0;0H");
        console.table(results);
        mainMenu();
    });
};

const viewRoles = async () => {
    db.query('SELECT * FROM role', function (err, results) {
        process.stdout.write("\u001b[2J\u001b[0;0H");
        console.table(results);
        mainMenu();
    });
};

const viewEmployees = async () => {
    db.query('SELECT * FROM employee', function (err, results) {
        process.stdout.write("\u001b[2J\u001b[0;0H");
        console.table(results);
        mainMenu();
    });
};

const addDept = async () => {
    const questions = [
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the department you would like to add?"
        }
    ]
    await inquirer.prompt(questions);
    db.query('INSERT INTO department (name) VALUES (?)', questions.deptName, function (err, results) {
        process.stdout.write("\u001b[2J\u001b[0;0H");
        console.log("Department added successfully!");
        mainMenu();
    });
};

const addRole = async () => {
    const questions = [
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the role you would like to add?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the role you would like to add?"
        },
        {
            type: "input",
            name: "roleDept",
            message: "What is the department ID of the role you would like to add?"
        }
    ];
    return inquirer.prompt(questions);
};

const addEmployee = async () => {
    const questions = [
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee you would like to add?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the employee you would like to add?"
        },
        {
            type: "input",
            name: "roleID",
            message: "What is the role ID of the employee you would like to add?"
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the manager ID of the employee you would like to add?"
        }
    ];
    return inquirer.prompt(questions);
};

const updateRole = async () => {
    const questions = [
        {
            type: "input",
            name: "employeeID",
            message: "What is the ID of the employee whose role you would like to update?"
        },
        {
            type: "input",
            name: "newRoleID",
            message: "What is the ID of the new role you would like to assign to this employee?"
        }
    ];
    return inquirer.prompt(questions);
};

module.exports = viewDepts;