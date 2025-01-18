import { Like } from "../model/Like.js";

export const toggleLike = async (request, reply) => {
  try {
    const like = await Like.findOne({
      where: {
        carId: request.params.carId,
        userId: request.user.userId,
      },
    });

    if (like) {
      await like.destroy();
      return reply.send({ message: "Like deleted succesfully", like });
    }

    const newLike = await Like.create({
      carId: parseInt(request.params.carId, 10),
      userId: request.user.userId,
    });

    reply.status(201).send({ message: "Like gived succesfully", newLike });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const getCarLikes = async (request, reply) => {
  try {
    const likes = await Like.count({
      where: {
        carId: request.params.carId,
      },
    });
    reply.send({ likes });
  } catch (error) {
    reply.status(500).send({ error });
  }
};
