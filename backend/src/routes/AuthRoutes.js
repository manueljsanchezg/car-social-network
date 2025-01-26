export default async function AuthRoutes(fastify) {
  fastify.get("/auth/validate-token", { onRequest: [fastify.authenticate] }, async(request, reply) => {
    reply.send({ valid: true })
  });
}