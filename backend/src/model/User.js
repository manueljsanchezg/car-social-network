import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Car } from "./Car.js";
import { Like } from "./Like.js";
import { Comment } from "./Comment.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Email must be valid",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

