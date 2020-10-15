const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre de la categoria es necesario']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
});

module.exports = mongoose.model('Categoria', categoriaSchema);