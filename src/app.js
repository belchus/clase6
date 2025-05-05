import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb+srv://CoderUser:123@codercluster.w5adegs.mongodb.net/?retryWrites=true&w=majority`)

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Nombre de tu API',
        description: 'Descripción de lo que hace tu API',
        version: '1.0.0',
      },
    },
    apis: ['./docs/**/*.yaml'], // Si el archivo está dentro de una subcarpeta
    // Asegurate de apuntar al YAML
  };
  
app.use(express.json());
app.use(cookieParser());
const spects = swaggerJSDoc(swaggerOptions);
app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(spects))
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
