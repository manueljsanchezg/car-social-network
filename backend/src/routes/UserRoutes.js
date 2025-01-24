import { schemaHasRules } from "ajv/dist/compile/util.js";
import { getAllUsers, loginUser, registerUser} from "../controllers/UserController.js";
import { LoginUserSchema, registerUserSchema } from "../schemas/UserSchema.js";

export default async function UserRoutes(fastify) {
  fastify.get("/users", { onRequest: [fastify.authenticate] }, getAllUsers);
  //fastify.get('/users/:id')
  fastify.post("/users/register", { schema: registerUserSchema} ,registerUser);
  fastify.post("/users/login", { schema: LoginUserSchema}, loginUser);
  //fastify.delete('/users')
}
