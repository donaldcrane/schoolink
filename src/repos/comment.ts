import { repo } from "../core";

import { db } from "../models";
import { commentData } from "../utils";

export const createComment = (id: number, { postId, comment }: commentData) =>
  repo(() =>
    db.comments.create({
      data: {
        post: { connect: { id: postId } },
        comment,
        user: {
          connect: {
            id,
          },
        },
      },
      include: {
        user: {
          select: { id: true, name: true, phone: true },
        },
        post: true,
      },
    })
  );

export const findUserComment = (userId: number, id: number) =>
  repo(() =>
    db.comments.findFirst({
      where: { userId, id },
    })
  );

export const updateComment = (id: number, comment: string) =>
  repo(() =>
    db.comments.update({
      where: { id },
      data: {
        comment,
      },
    })
  );

export const deleteUserComment = (userId: number, id: number) =>
  repo(() =>
    db.comments.deleteMany({
      where: {
        userId,
        id,
      },
    })
  );
