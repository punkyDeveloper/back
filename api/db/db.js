const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('La URI de MongoDB no está definida en las variables de entorno');
}

mongoose.connect(uri) 
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1); 
  });

module.exports = mongoose;
