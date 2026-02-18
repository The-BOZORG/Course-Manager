import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course Manager API',
      version: '1.0.0',
      description: 'API documentation for Course Manager service',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./docs/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
