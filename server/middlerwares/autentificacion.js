const { request } = require("../routes");
const jwt = require('jsonwebtoken');
// ==========================
// verificar toke
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

module.exports = {
    verificaToken,
    verificaRol
}