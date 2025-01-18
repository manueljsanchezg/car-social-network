import { getAllUsers, loginUser, registerUser} from "../controllers/UserController.js";

export default async function UserRoutes(fastify) {
  fastify.get("/users", { onRequest: [fastify.authenticate] }, getAllUsers);
  //fastify.get('/users/:id')
  fastify.post("/users/register", registerUser);
  fastify.post("/users/login", loginUser);
  //fastify.delete('/users')
}
