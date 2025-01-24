import { createCar, deleteUserCarById, getAllCars, getAllNoUserCars, getAllUserCars, getCarById, updateCar } from "../controllers/CarController.js";
import { createComment, deleteComment, getAllCarComments, updateComment } from "../controllers/CommentController.js";
import { getCarLikes, toggleLike } from "../controllers/LikeController.js";
import { createCarSchema, updateCarSchema } from "../schemas/CarSchema.js";

export default async function CarRoutes(fastify) {
  fastify.get("/cars/all", { onRequest: [fastify.authenticate] }, getAllCars);
  fastify.get("/cars/user", { onRequest: [fastify.authenticate] }, getAllUserCars);
  fastify.get("/cars/no-user", { onRequest: [fastify.authenticate] }, getAllNoUserCars);
  fastify.get("/cars/:carId", { onRequest: [fastify.authenticate] }, getCarById);
  fastify.post("/cars", { onRequest: [fastify.authenticate], schema: createCarSchema }, createCar);
  fastify.put("/cars/:carId", { onRequest: [fastify.authenticate], schema: updateCarSchema }, updateCar);
  fastify.delete("/cars/:carId", { onRequest: [fastify.authenticate] }, deleteUserCarById);

  fastify.post("/cars/:carId/like", { onRequest: [fastify.authenticate] }, toggleLike);
  fastify.get("/cars/:carId/like", { onRequest: [fastify.authenticate] }, getCarLikes);

  fastify.get("/cars/:carId/comments", { onRequest: [fastify.authenticate] }, getAllCarComments);
  fastify.post("/cars/:carId/comments", { onRequest: [fastify.authenticate] }, createComment);
  fastify.put("/cars/:carId/comments/:commentId", { onRequest: [fastify.authenticate] }, updateComment);
  fastify.delete("/cars/:carId/comments/:commentId", { onRequest: [fastify.authenticate] }, deleteComment);
}
