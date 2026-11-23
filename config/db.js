const mysql = require('mysql2/promise');
 
const dotenv = require('dotenv');
dotenv.config();
 

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10, // the default: at most 10 connections open at once
 
  decimalNumbers: true,
 
  timezone: 'Z',
});
 
module.exports = pool;