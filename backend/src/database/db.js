import { Sequelize } from "sequelize";
//import path from "path";

export const sequelize = new Sequelize('sqlite::memory: ');

/*
const storagePath = path.resolve("src/storage/database.sqlite");

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false,
});
*/
