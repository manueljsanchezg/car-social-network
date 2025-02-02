import { Op } from "sequelize";
import { Car } from "../model/Car.js";
import { User } from "../model/User.js";

export const getCars = async (request, reply) => {
  try {
    console.log(request.user);
    console.log("=================");
    console.log("Query recibida:", request.query);
    const { type } = request.query;
    let whereClause = {};
    if (type === "user") {
      whereClause = { userId: request.user.userId };
    } else if (type === "no-user") {
      whereClause = { userId: { [Op.ne]: request.user.userId } };
    }

    const cars = await Car.findAll({
      where: whereClause,
      include: {
        model: User,
        attributes: ["email"],
      },
    });

    reply.send({ cars });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const getCarById = async (request, reply) => {
  try {
    const car = await Car.findByPk(request.params.carId);

    reply.send({ car });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const createCar = async (request, reply) => {
  try {
    const { model, brand, cv, year } = request.body;

    console.log("User: ", request.user);

    await Car.create({
      model,
      brand,
      cv,
      year,
      userId: request.user.userId,
    });

    reply.status(201).send({ message: "Car created successfully" });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const updateCar = async (request, reply) => {
  try {
    const { model, brand, cv, year } = request.body;

    const carToUpdate = await Car.findOne({
      where: {
        id: request.params.carId,
        userId: request.user.userId,
      },
    });

    if (!carToUpdate) {
      reply.status(404).send({ error: "Car not found" });
    }

    if (model) carToUpdate.model = model;
    if (brand) carToUpdate.brand = brand;
    if (cv) carToUpdate.cv = cv;
    if (year) carToUpdate.year = year;

    await carToUpdate.save();
    reply.status(201).send({ message: "Car updated successfully" });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const deleteUserCarById = async (request, reply) => {
  try {
    const deleted = await Car.destroy({
      where: {
        id: request.params.carId,
        userId: request.user.userId,
      },
    });

    if (deleted === 0) {
      reply.status(404).send({ error: "Car not found" });
    }
    reply.status(200).send({ message: "Car deleted successfully" });
  } catch (error) {
    reply.status(500).send({ error });
  }
};
