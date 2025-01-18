import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Like = sequelize.define("like", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

