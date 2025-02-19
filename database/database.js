import { Sequelize } from 'sequelize';
import 'dotenv/config';

const database = process.env.DATABASE;
const user = process.env.NAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;


// export const sequelize = new Sequelize('my_db', 'admin', '3379500523', {
//   host: 'database-3.c9jo2atyylow.eu-north-1.rds.amazonaws.com',
//   dialect: 'mysql',
// });

export const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
});

// home laptop
// export const sequelize = new Sequelize("pet", "jtopolska", "your_password", {
//   host: "localhost",
//   dialect: "mysql",
// });

// work laptop
// export const sequelize = new Sequelize(database, user, password, {
//   host: host,
//   dialect: "mysql",
// });

export const connectToDB = async () => {
  await sequelize
    .authenticate()
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log('Connection error', err));
};