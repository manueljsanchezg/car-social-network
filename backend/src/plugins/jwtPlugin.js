import fastifyJwt from "@fastify/jwt";
import fastifyPlugin from "fastify-plugin";
import dotenv from "dotenv"

dotenv.config()

export default fastifyPlugin(async function (fastify, opts) {
  fastify.register(fastifyJwt, {
    secret: process.env.SECRET_KEY || 'your_secret_key',
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      const decoded = await request.jwtVerify();
      request.user = { userId: decoded.userId, email: decoded.email };
    } catch (error) {
      reply
        .status(401)
        .send({ message: "Authentication failed", error: error.message });
    }
  });
});
