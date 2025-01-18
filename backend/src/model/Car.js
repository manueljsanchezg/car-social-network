import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Car = sequelize.define("car", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cv: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

