const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'medicare',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || '',
  {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT || 3306),
    dialect: 'mysql',
    logging: false
  }
);

let databaseConnected = false;

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    databaseConnected = true;
    console.log('MySQL connected');
  } catch (error) {
    console.error('MySQL connection failed:', error.message);
    console.warn('The API is still running, but database operations will fail until MySQL is available.');
  }
}

function isDatabaseConnected() {
  return databaseConnected;
}

module.exports = { connectDatabase, isDatabaseConnected, sequelize };
