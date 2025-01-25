import fastify from "fastify";
import { sequelize } from "./database/db.js";
import UserRoutes from "./routes/UserRoutes.js";
import "./model/User.js";
import "./model/Car.js";
import "./model/Like.js";
import "./model/Comment.js";
import "./model/associations.js";
import jwtPlugin from "./plugins/jwtPlugin.js";
import CarRoutes from "./routes/CarRoutes.js";
import cors from "@fastify/cors"

const server = fastify({ logger: true });
server.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['POST', 'PUT', 'GET', 'DELETE']
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");

    await sequelize.sync({ force: false });
    console.log("Modelos sincronizados con la base de datos.");

    server.register(jwtPlugin);
    server.register(UserRoutes);
    server.register(CarRoutes);

    await server.listen({ port: 3000 });

    console.log(`Server running on PORT 3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
