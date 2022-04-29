require('dotenv').config(); // uso libreria dotenv para leer la variable de entorno PORT

const config = {
  port: process.env.PORT | 3000,
};

module.exports = config;
