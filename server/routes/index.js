const express = require('express');
const app = express();
const colors = require('colors');
const bcrypt = require('bcrypt');

app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./categoria'));
app.use(require('./producto'));

module.exports = app;