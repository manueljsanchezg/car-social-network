import { Comment } from "../model/Comment.js";

export const getAllCarComments = async (request, reply) => {
  try {
    const comments = await Comment.findAll({
      where: { carId: request.params.carId },
    });

    reply.send({ comments });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const createComment = async (request, reply) => {
  try {
    const { message } = request.body;

    const newComment = await Comment.create({
      message,
      userId: request.user.userId,
      carId: request.params.carId,
    });

    reply.send({ message: "Comment created succesfully", newComment });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const updateComment = async (request, reply) => {
  try {
    const { message } = request.body;

    const commentToUpdate = await Comment.findOne({
      where: {
        id: request.params.commentId,
        userId: request.user.userId,
        carId: request.params.carId,
      },
    });

    if (!commentToUpdate) {
      reply.status(404).send({ error: "Comment not found" });
    }

    commentToUpdate.message = message;

    await commentToUpdate.save();

    reply.send({ message: "Comment updated succesfully", commentToUpdate });
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const deleteComment = async (request, reply) => {
  try {
    const commentToDelete = await Comment.destroy({
      where: {
        id: request.params.commentId,
        userId: request.user.userId,
        carId: request.params.carId,
      },
    });

    if (commentToDelete === 0) {
      reply.status(404).send({ error: "Comment not found" });
    }

    reply.status(200).send({ message: "Comment deleted succesfully "})
  } catch (error) {
    reply.status(500).send({ error });
  }
};
