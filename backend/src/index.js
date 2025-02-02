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
import AuthRoutes from "./routes/AuthRoutes.js"
import cors from "@fastify/cors"
import { User } from "./model/User.js";
import { Car } from "./model/Car.js";
import { Comment } from "./model/Comment.js";

const server = fastify({ logger: true });
server.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['POST', 'PUT', 'GET', 'DELETE']
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");

    await sequelize.sync({ force: true });
    console.log("Modelos sincronizados con la base de datos.");


    await User.bulkCreate([
      {id: 1, email: "prueba1@gmail.com", password: "$2b$10$12oghGpgTfYidC9Vg7x3j.jOzLu/t12qIoT/7JFLp9NfXHf19fIBG"},
      {id: 2, email: "prueba2@gmail.com", password: "$2b$10$12oghGpgTfYidC9Vg7x3j.jOzLu/t12qIoT/7JFLp9NfXHf19fIBG"}
    ])

    await Car.bulkCreate([
      {id: 1, model: "modelo1", brand: "marca1", cv: 90, year: 2018, userId: 1},
      {id: 2, model: "modelo3", brand: "marca1", cv: 90, year: 2018, userId: 1},
      {id: 3, model: "modelo5", brand: "marca1", cv: 90, year: 2018, userId: 1},
      {id: 4, model: "modelo7", brand: "marca1", cv: 90, year: 2018, userId: 1},
      {id: 5, model: "modelo9", brand: "marca1", cv: 90, year: 2018, userId: 1},
      {id: 6, model: "modelo11", brand: "marca1", cv: 90, year: 2018, userId: 1},
      {id: 7, model: "modelo13", brand: "marca1", cv: 90, year: 2018, userId: 1},
      {id: 8, model: "modelo15", brand: "marca1", cv: 90, year: 2018, userId: 1},
      {id: 9, model: "modelo2", brand: "marca2", cv: 90, year: 2018, userId: 2},
      {id: 10, model: "modelo4", brand: "marca2", cv: 90, year: 2018, userId: 2},
      {id: 11, model: "modelo6", brand: "marca2", cv: 90, year: 2018, userId: 2},
      {id: 12, model: "modelo8", brand: "marca2", cv: 90, year: 2018, userId: 2},
      {id: 13, model: "modelo10", brand: "marca2", cv: 90, year: 2018, userId: 2},
      {id: 14, model: "modelo12", brand: "marca2", cv: 90, year: 2018, userId: 2},
      {id: 15, model: "modelo14", brand: "marca2", cv: 90, year: 2018, userId: 2}
    ])

    server.register(jwtPlugin);
    server.register(AuthRoutes);
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
