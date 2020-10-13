require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const app = express();
const bodyParser = require('body-parser');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log(`Base de Datos`.blue, `ONLINE`.green, `!!!`.red);
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto:`.yellow, `${ process.env.PORT }`.blue);
});