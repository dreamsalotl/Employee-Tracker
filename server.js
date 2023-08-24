const express = require("express");
const mysql = require('mysql2');
const mainMenu = require("./assets/js/query.js");
const logo = require("./assets/js/logo.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//------------------------------8<---------------------------------------------
// This is the initialisation function. It clears the screen and displays the logo and main menu.

const init = () => {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  logo();
  mainMenu();
};

init();