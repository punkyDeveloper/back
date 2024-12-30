const mongoose = require('../db/db');

const SchemaClientes = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Se requiere un nombre de cliente'],
    min: 2,
    max: 30,
  },
  contrasena: {
    type: String,
    required: [true, 'Se requiere un contraseña del cliente'],
    min: 2,
    max: 30,
  },
  email: {
    type: String,
    required: [true, 'Se requiere un correo'],
    unique: true,
  },
}, {timestamps: true});

const nuevoCliente = mongoose.model('clientes', SchemaClientes);
module.exports = nuevoCliente;