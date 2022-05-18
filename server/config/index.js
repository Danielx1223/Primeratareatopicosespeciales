require('dotenv').config();

const config = {
  port: process.env.PORT | 4000,
  jwtSecret: process.env.JwtSecret || "muyFacil1234",
  database: {
    protocol: process.env.DB_PROTOCOL || "mongodb",
    url: process.env.DB_URL || "127.0.0.1/tasks",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
  },

  pagination: {
    limit: 10,
    skip: 0,
  },

  sort: {
    sortBy: {
      default: 'createdAt',
      fields: ['createdAt', 'updatedAt'],
    },
    direction: {
      default: 'desc',
      options: ['desc', 'asc'],
    },
  },
};

module.exports = config;