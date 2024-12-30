const swaggerJsdoc = require('swagger-jsdoc');
const { serve } = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'tasks API',
      version: '1.0.0',
      contact: {
        name: 'Santiago Hernandez',
        email: 'santiagohernandezgomez@gmail.com',
      },
      servers: [
        {
          url: 'http://localhost:4000',
        },
      ]
    },
  },
  apis: ['./api/router/*js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = specs;