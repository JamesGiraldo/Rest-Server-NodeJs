const express = require('express');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const { json } = require('body-parser');
let app = express();
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
let { verificaToken, verificaRol, verificaTokenImg } = require('../middlerwares/autentificacion');
const fs = require('fs');
const path = require('path');

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let noImgagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImgagePath);
    }
});


module.exports = app;