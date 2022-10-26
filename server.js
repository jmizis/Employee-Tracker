const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
const mysql = require('mysql2');



db.connect(function (err) {
  if (err) throw err;
  init();
});



// Options to choose When you start the application
function init() {
  inquirer.prompt([
    {
    name: "prompt",
    type: "list",
    message: "What would you like to do?",
    choices: [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a new department",
    "Add a new role",
    "Add a new employee",
    "Exit"
    ]
    }])
    .then(function (answer) {
    switch (answer.prompt) {
    case "View all departments":
    viewDepartments();
    break;
    case "View all roles":
    viewRoles();
    break;
    case "View all employees":
    viewEmployees();
    break;
    case "Add a new department":
    addDepartment();
    break;
    case "Add a new role":
    addRole();
    break;
   
    case "Add a new employee":
    addEmployee();
    break;
    
    case "exit":
    quit()
    break;
    }
    });
    
  // Once you select the prompt you want this will load the option from the seed.sql file
}
function viewDepartments(){
db.query("select * from department",(err,res)=>{
if (err) throw err
console.table(res)
init()
})
}

function viewRoles(){
  db.query("select * from role",(err,res)=>{
  if (err) throw err
  console.table(res)
  init()
  })
  }

  function viewEmployees(){
    db.query("select * from employees",(err,res)=>{
    if (err) throw err
    console.table(res)
    init()
    })
    }

    // Functions below will allow you to add to the table.

    // Add a new department.
    function addDepartment() {
      inquirer.prompt([
      {
      name: "addDept",
      message: "What is the name of the new department?"
      }
      ])
      .then(function (answer) {
      db.query("INSERT INTO department SET ?", {
      name: answer.addDept
      },
      function (err, res) {
      if (err) throw err;
      console.log("Department ");
      init();
      }
      );
      });
      }

     // Add new employee.
      function addEmployee() {
        db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
         //asking for the three properties on the employee table 
        inquirer.prompt([
        {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
        },
        {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
        },
        {
        name: "roleId",
        type: "list",
        choices: res.map(role => role.title),
        message: "Select a role for the employee"
        }
        ])
        .then(function (answers) {
        const selectedRole = res.find(role => role.title === answers.roleId);
        db.query("INSERT INTO employees SET ?",{
        
        first_name: answers.firstName,
        last_name: answers.lastName,
        role_id: selectedRole.id
        }, 
        function (err, res) {
        if (err) throw err;
        console.log("Added new employee");
        init();
        })
        })
        })
        };

      
      
         
        //  Adding New Role 
          function addRole() {
            db.query("SELECT * FROM department ", function (err, res) {
            if (err) throw err;
            //asking for the three properties on the roles table 
            inquirer.prompt([
            {
            name: "title",
            type: "input",
            message: "What is the title of the new role?"
            },
            {
            name: "salary",
            type: "input",
            message: "What is the salary of this position?",
            },
            {
            name: "deptId",
            type: "list",
            message: "Select a department for this role",
            choices: res.map(item => item.name)
            }
            ])
            .then(function (answers) {
            const selectedDept = res.find(dept => dept.name === answers.deptId);
            db.query("INSERT INTO role SET ?",
            {
            title: answers.title,
            salary: answers.salary,
            department_id: selectedDept.id
            },
            function (err, res) {
            if (err) throw err;
            console.log("Added new role");
            init();
            }
            );
            });
            })
            };
            
    
        
          



    // Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
