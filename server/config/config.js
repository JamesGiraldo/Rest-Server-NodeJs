// ===================
// Puerto
// ===================
process.env.PORT = process.env.PORT || 3000;
// ===========================
// CREDENCIAL DE MONGO ATLAS
// usuario: james
// password: JPxcOmsPKkXB5IcI
// ===========================
// mongodb+srv://james:JPxcOmsPKkXB5IcI@cluster0.0m6ol.mongodb.net/cafe
// ===========================

// ===========================
// ENTORNO
// ===========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================
// BASE DE DATOS
// ===========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;