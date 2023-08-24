const mysql = require("mysql2");
const logo = require("./logo");
const inquirer = require("inquirer");


//------------------------------8<---------------------------------------------
// This is the sql query that will be used to create the database and tables.


const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Kokiri",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);


//------------------------------8<---------------------------------------------
// This is the main menu function. It is called at the end of each function to return the user to the main menu.


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
          name: "Update Employee Manager",
          value: 7,
        },
        {
          name: "View Employees By Manager",
          value: 8,
        },
        {
          name: "View Employees By Department",
          value: 9,
        },
        {
          name: "Delete A Department",
          value: 10,
        },
        {
          name: "Delete A Role",
          value: 11,
        },
        {
          name: "Delete An Employee",
          value: 12,
        },
        {
          name: "View Department Budgets",
          value: 13,
        },
        {
          name: "Exit",
          value: 14,
        }
      ]
    }
  ]
  return inquirer.prompt(questions);
};

const mainMenu = async () => {
  showMenu().then((answers) => {
    if (answers.selection === 0) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return viewDepts();
    } else if (answers.selection === 1) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return viewRoles();
    } else if (answers.selection === 2) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return viewEmployees();
    } else if (answers.selection === 3) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return addDept();
    } else if (answers.selection === 4) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return addRole();
    } else if (answers.selection === 5) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return addEmployee();
    } else if (answers.selection === 6) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return updateRole();
    } else if (answers.selection === 7) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return updateManager();
    } else if (answers.selection === 8) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return viewByManager();
    } else if (answers.selection === 9) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return viewByDept();
    } else if (answers.selection === 10) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return deleteDept();
    } else if (answers.selection === 11) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return deleteRole();
    } else if (answers.selection === 12) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return deleteEmployee();
    } else if (answers.selection === 13) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      logo();
      return viewBudgets();
    } else if (answers.selection === 14) {
      process.stdout.write("\u001b[2J\u001b[0;0H");
      return process.exit();
    }
  });
};


//------------------------------8<---------------------------------------------
// These are the functions that will be called by the main menu and will execute the sql queries. 


const viewDepts = async () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    mainMenu();
  });
};

const viewRoles = async () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    mainMenu();
  });
};

const viewEmployees = async () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    mainMenu();
  });
};

const addDept = async () => {
  const questions = [
    {
      type: "input",
      name: "deptName",
      message: "What is the name of the department you would like to add?",
    },
    {
      type: "input",
      name: "deptID",
      message: "What is the ID of the department you would like to add?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `INSERT INTO department (id, name) VALUES (${answers.deptID}, "${answers.deptName}")`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Department successfully added!");
      mainMenu();
    }
  );
};

const addRole = async () => {
  const questions = [
    {
      type: "input",
      name: "roleName",
      message: "What is the name of the role you would like to add?",
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary of the role you would like to add?",
    },
    {
      type: "input",
      name: "roleDept",
      message: "What is the department ID of the role you would like to add?",
    },
    {
      type: "input",
      name: "roleID",
      message: "What is the ID of the role you would like to add?",
    }
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `INSERT INTO role (id, title, salary, department_id) VALUES (${answers.roleID}, "${answers.roleName}", ${answers.roleSalary}, ${answers.roleDept})`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Role successfully added!");
      mainMenu();
    }
  );
};

const addEmployee = async () => {
  const questions = [
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the employee you would like to add?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the employee you would like to add?",
    },
    {
      type: "input",
      name: "roleID",
      message: "What is the role ID of the employee you would like to add?",
    },
    {
      type: "input",
      name: "managerID",
      message: "What is the manager ID of the employee you would like to add?",
    },
    {
      type: "input",
      name: "employeeID",
      message: "What is the ID of the employee you would like to add?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${answers.employeeID}, "${answers.firstName}", "${answers.lastName}", ${answers.roleID}, ${answers.managerID})`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Employee successfully added!");
      mainMenu();
    }
  );
};

const updateRole = async () => {
  const questions = [
    {
      type: "input",
      name: "employeeID",
      message:
        "What is the ID of the employee whose role you would like to update?",
    },
    {
      type: "input",
      name: "newRoleID",
      message:
        "What is the ID of the new role you would like to assign to this employee?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `UPDATE employee SET role_id = ${answers.newRoleID} WHERE id = ${answers.employeeID}`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Employee role successfully updated!");
      mainMenu();
    }
  );
};

const updateManager = async () => {
  const questions = [
    {
      type: "input",
      name: "employeeID",
      message: "What is the ID of the employee whose manager you would like to update?",
    },
    {
      type: "input",
      name: "newManagerID",
      message: "What is the ID of the new manager you would like to assign to this employee?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `UPDATE employee SET manager_id = ${answers.newManagerID} WHERE id = ${answers.employeeID}`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Employee manager successfully updated!");
      mainMenu();
    }
  );
};

const viewByManager = async () => {
  const questions = [
    {
      type: "input",
      name: "managerID",
      message: "What is the ID of the manager whose employees you would like to view?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `SELECT * FROM employee WHERE manager_id = ${answers.managerID}`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      mainMenu();
    }
  );
};

const viewByDept = async () => {
  const questions = [
    {
      type: "input",
      name: "deptID",
      message: "What is the ID of the department whose employees you would like to view?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ${answers.deptID})`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      mainMenu();
    }
  );
};

const deleteDept = async () => {
  const questions = [
    {
      type: "input",
      name: "deptID",
      message: "What is the ID of the department you would like to delete?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `DELETE FROM department WHERE id = ${answers.deptID}`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Department successfully deleted!");
      mainMenu();
    }
  );
};

const deleteRole = async () => {
  const questions = [
    {
      type: "input",
      name: "roleID",
      message: "What is the ID of the role you would like to delete?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `DELETE FROM role WHERE id = ${answers.roleID}`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Role successfully deleted!");
      mainMenu();
    }
  );
};

const deleteEmployee = async () => {
  const questions = [
    {
      type: "input",
      name: "employeeID",
      message: "What is the ID of the employee you would like to delete?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `DELETE FROM employee WHERE id = ${answers.employeeID}`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Employee successfully deleted!");
      mainMenu();
    }
  );
};

const viewBudgets = async () => {
  const questions = [
    {
      type: "input",
      name: "deptID",
      message: "What is the ID of the department whose budget you would like to view?",
    },
  ];
  const answers = await inquirer.prompt(questions);
  db.query(
    `SELECT SUM(salary) AS budget FROM role WHERE department_id = ${answers.deptID}`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      mainMenu();
    }
  );
};

module.exports = viewDepts;
