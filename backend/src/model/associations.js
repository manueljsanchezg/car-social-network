import { Car } from "./Car.js";
import { User } from "./User.js";
import { Like } from "./Like.js";
import { Comment } from "./Comment.js";

Car.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Car, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


Like.belongsTo(Car, {
  foreignKey: "carId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Car.hasMany(Like, {
  foreignKey: "carId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Like.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Like, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Comment.belongsTo(Car, {
  foreignKey: "carId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Car.hasMany(Comment, {
  foreignKey: "carId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
