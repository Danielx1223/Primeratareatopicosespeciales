const express = require('express');
const api = require('./api/v1');
const config = require('./config/');
const { expressjwt: jwt } = require("express-jwt");

const app = express();

app.use(express.json());

app.use(
  jwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/v1/users/login",
      "/api/v1/users/register"
    ]
  })
);

app.use('/api/v1', api);

app.use((req, res, next) => {
  next({
    message: 'Route Not Found',
    statusCode: 404,
  });
});

app.use((err, req, res, next) => {
  const { message = ' ' } = err;
  let { statusCode = 500 } = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
