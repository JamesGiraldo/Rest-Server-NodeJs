require('./config/config');
const express = require('express');
const colors = require('colors');
const app = express();
const bodyParser = require('body-parser');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // Parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json('Hello Wold');
})
app.get('/usuario', function(req, res) {
    res.json('Get usuario');
})
app.post('/usuario', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }
})
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    res.json({
        id
    });
})
app.delete('/usuario', function(req, res) {
    res.json('Delete Wold');
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto:`.yellow, `${ process.env.PORT }`.blue);
});