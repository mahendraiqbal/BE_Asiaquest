import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API Documentation',
      version: '1.0.0',
      description: 'A simple Todo List API documentation',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routers/*.ts'],
};

export const specs = swaggerJsdoc(options);