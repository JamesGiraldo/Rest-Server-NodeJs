const express = require('express');
const app = express();
const colors = require('colors');
let Producto = require('../models/producto');
let { verificaToken, verificaRol } = require('../middlerwares/autentificacion');

// ============================
// Mostrar todos los productos
// ============================
app.get('/productos', verificaToken, (req, res) => {
    // paginar productos comienso
    let desde = req.query.desde || 0;
    desde = Number(desde);
    // paginar productos hasta
    let limite = req.query.limite || 5;
    limite = Number(limite);
    // buscar todos los productos
    Producto.find({ disponible: true })
        // organizar
        .sort('nombre')
        // paginacion ((skip y limit))
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            // para manejar el error si no sale
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Problemas al cargar todos los productos'
                    }
                });
            }
            // si la respuesta es ok, y cuantos Hay
            Producto.count({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    cantidad: conteo,
                    productos
                });
            });
        })
});
// ==============================
// Mostrar un producto por ID
// ==============================
app.get('/producto/:id', verificaToken, (req, res) => {
    // obtener el ID de los parametros
    let id = req.params.id;
    // buscar el id de producto
    Producto.findById(id, (err, productoDB) => {
        // para manejar el error si no sale
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Problemas al cargar el producto solicitado'
                }
            });
        }
        // evaluar si no viene el producto
        if (!productoDB) {
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
            productoDB
        });
    });
});
// =====================
// Buscar productos
// =====================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    // Recibir el termino
    let termino = req.params.termino;
    // exprecion regular
    let regex = new RegExp(termino, 'i');
    Producto.find({ disponible: true, nombre: regex })
        .exec((err, productos) => {
            // para manejar el error si no sale
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            // si la respuesta es ok
            res.json({
                ok: true,
                productos
            });
        });
});

// =====================
// Crear un producto
// =====================
app.post('/producto', verificaToken, (req, res) => {
    // obtener lo que tiene el body
    let body = req.body;
    // instanciar el producto
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    });
    // grabar o guardar el producto 
    producto.save((err, productoDB) => {
        // para manejar el error si no sale
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        // evaluar si no se creo el producto
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // si se guarda el producto
        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

// =======================
// Actualizar un producto
// =======================
app.put('/producto/:id', [verificaToken], (req, res) => {
    // obtener el ID de los parametros
    let id = req.params.id;
    // obtener lo que tiene el body
    let body = req.body;
    // instanciar el producto
    let datosProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    };
    Producto.findByIdAndUpdate(id, datosProducto, { new: true, runValidators: true }, (err, productoDB) => {
        // para manejar el error si no sale
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        // evaluar si no se actualizo el producto
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // si se actualizo el producto
        res.json({
            ok: true,
            producto: productoDB
        });
    })
});

// =====================
// Eliminar un producto
// =====================
app.delete('/producto/:id', [verificaToken, verificaRol], (req, res) => {
    // obtener el ID de los parametros
    let id = req.params.id;
    let cambiaEstado = {
        disponible: false
    };
    Producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Producto eliminado',
            producto: productoBorrado,
        });
    })
});

// Exportar el modulo de app
module.exports = app;