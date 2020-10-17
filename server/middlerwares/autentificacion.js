const { request } = require("../routes");
const jwt = require('jsonwebtoken');
// ==========================
// verificar token
// ==========================
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
// ==========================
// verificar Rol
// ==========================
let verificaRol = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role == "ADMIN_ROLE") {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                message: 'Rol no valido'
            }
        });
    }
}

// ==========================
// verificar Imagen
// ==========================
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = {
    verificaToken,
    verificaRol,
    verificaTokenImg
}