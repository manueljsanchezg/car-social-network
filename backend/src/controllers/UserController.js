import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/User.js";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (request, reply) => {
  try {
    const { email, password } = request.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      reply.status(400).send({ error: "The user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    reply.status(201).send({ message: "User created successfully" });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const loginUser = async (request, reply) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      reply.status(404).send({ error: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      reply.status(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );

    reply.send({ email, token });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const getAllUsers = async (request, reply) => {
  try {
    const authenticatedEmail = request.email;
    console.log("Email autenticado:", authenticatedEmail);
    const users = await User.findAll();
    reply.send(users);
  } catch (error) {
    reply.status(500).send({ error });
  }
};
