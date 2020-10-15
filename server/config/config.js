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
// fecha de vencimiento de token
// ===========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = '48h';
// ===========================
// SEEd de autentificacion
// ===========================
process.env.SEED = process.env.SEED || 'seed-de-desarrollo';

// ===========================
// BASE DE DATOS
// ===========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://james:JPxcOmsPKkXB5IcI@cluster0.0m6ol.mongodb.net/cafe'
}
process.env.URLDB = urlDB;

// ===========================
// Google Client ID
// ===========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '399791814098-emq2mlmcpll6qgqefas3pb06rllqvded.apps.googleusercontent.com';