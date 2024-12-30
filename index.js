const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs'); // Importamos fs para comprobar el archivo

const swaggerUi = require('swagger-ui-express');
const app = express();
const router = require('./api/router/routers');
require('dotenv').config();

const hostname = '127.0.0.1';
const port = 4000;

// Rutas y middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Verificar existencia del archivo swagger.json
const swaggerPath = './suagger/swagger.js';

if (fs.existsSync(swaggerPath)) {
  const specs = require(swaggerPath);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
} else {
  console.error(`El archivo ${swaggerPath} no existe. Verifica la ruta.`);
  process.exit(1); // Detenemos la ejecución si no se encuentra el archivo
}

// Uso de rutas de la API
app.use('/api/', router);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
