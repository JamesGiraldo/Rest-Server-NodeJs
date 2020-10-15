const express = require('express');
const app = express();
const colors = require('colors');
let Categoria = require('../models/categoria');
let { verificaToken, verificaRol } = require('../middlerwares/autentificacion');

// =========================
// Mostrar todas categorias
// =========================
app.get('/categorias', verificaToken, (req, res) => {
    // buscar todas las categorias
    Categoria.find({})
        // organizar
        .sort('nombre')
        // revisar que el ID que existe en la categoria que se solicita y permite cargar la información ((populate))
        .populate('Usuario', 'nombre email')
        .exec((err, categorias) => {
            // para manejar el error si no sale
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Problemas al cargar todos los registros de categorias'
                    }
                });
            }
            // si la respuesta es ok, y cuantos Hay
            Categoria.count((err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    categorias
                });
            });
        })
});
// ==============================
// Mostrar una categoria por ID
// ==============================
app.get('/categoria/:id', verificaToken, (req, res) => {
    // obtener el ID de los parametros
    let id = req.params.id;
    // buscar todas las categorias
    Categoria.findById(id, (err, categoriaDB) => {
        // para manejar el error si no sale
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Problemas al cargar el registro de categoria solicitada'
                }
            });
        }
        // evaluar si no viene la categoria
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }
        // si la respuesta es ok        
        res.json({
            ok: true,
            categoriaDB
        });
    });
});
// =====================
// Crear una categoria
// =====================
app.post('/categoria', verificaToken, (req, res) => {
    // obtener lo que tiene el body
    let body = req.body;
    // instanciar la categoria
    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: req.usuario._id
    });
    // grabar la categoria o guardar
    categoria.save((err, categoriaDB) => {
        // para manejar el error si no sale
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        // evaluar si no se creo la categoria
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // si se guarda la categoria
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// =========================
// Actualizar una categoria
// =========================
app.put('/categoria/:id', [verificaToken], (req, res) => {
    // obtener el ID de los parametros
    let id = req.params.id;
    // obtener lo que tiene el body
    let body = req.body;
    // instanciar la categoria
    let nombrCategoria = {
        nombre: body.nombre
    };
    Categoria.findByIdAndUpdate(id, nombrCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        // para manejar el error si no sale
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        // evaluar si no se actualizo la categoria
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // si se actualizo la categoria
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })
});

// ========================
// Eliminar una categorias
// ========================
app.delete('/categoria/:id', [verificaToken, verificaRol], (req, res) => {
    // obtener el ID de los parametros
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        // para manejar el error si no sale
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        // evaluar si no se borro la categoria
        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }
        // si se borra la categoria
        res.json({
            ok: true,
            message: 'Categoria borrada',
            categoria: categoriaBorrada
        });
    })
});
// Exportar el modulo de app
module.exports = app;