import fastifyJwt from "@fastify/jwt";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async function (fastify, opts) {
  fastify.register(fastifyJwt, {
    secret: process.env.SECRET_KEY,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply
        .status(401)
        .send({ message: "Authentication failed", error: error.message });
    }
  });
});
