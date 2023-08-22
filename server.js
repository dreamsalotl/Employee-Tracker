const express = require("express");
const mysql = require('mysql2');
const mainMenu = require("./assets/js/query.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mainMenu();