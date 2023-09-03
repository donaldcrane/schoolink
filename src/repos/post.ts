import { repo } from "../core";

import { db } from "../models";
import { Pagination, PhotoData } from "../utils";

export const createPost = (id: number, post: string, data?: PhotoData[]) =>
  repo(() =>
    db.posts.create({
      data: {
        post,
        user: {
          connect: {
            id,
          },
        },
        files: data
          ? {
              createMany: {
                data,
              },
            }
          : undefined,
      },
      include: {
        user: {
          select: { id: true, name: true, phone: true },
        },
        files: { include: { file: true } },
      },
    })
  );

export const findUserPost = (userId: number, id: number) =>
  repo(() =>
    db.posts.findFirst({
      where: { userId, id },
    })
  );

export const updatePost = (id: number, post?: string, data?: PhotoData[]) =>
  repo(() =>
    db.posts.update({
      where: { id },
      data: {
        post: post ? post : undefined,
        files: data
          ? {
              createMany: { data },
            }
          : undefined,
      },
      include: {
        user: { select: { id: true, name: true } },
        comments: true,
        files: { include: { file: true } },
        likes: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    })
  );

export const findPost = (id: number) =>
  repo(() =>
    db.posts.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true } },
        comments: true,
        files: { include: { file: true } },
        likes: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    })
  );

export const countPosts = (post: string) =>
  repo(() =>
    db.posts.count({
      where: {
        post: post ? { contains: post, mode: "insensitive" } : undefined,
      },
    })
  );

export const countUserPosts = (userId: number, post: string) =>
  repo(() =>
    db.posts.count({
      where: {
        userId,
        post: post ? { contains: post, mode: "insensitive" } : undefined,
      },
    })
  );

export const findUserPosts = (
  userId: number,
  post: string,
  pagination: Pagination
) =>
  repo(() =>
    db.posts.findMany({
      where: {
        userId,
        post: post ? { contains: post, mode: "insensitive" } : undefined,
      },
      include: {
        user: { select: { id: true, name: true } },
        comments: true,
        files: { include: { file: true } },
        likes: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
      take: pagination.size,
      skip: pagination.size * pagination.page,
    })
  );

export const findPosts = (post: string, pagination: Pagination) =>
  repo(() =>
    db.posts.findMany({
      where: {
        post: post ? { contains: post, mode: "insensitive" } : undefined,
      },
      include: {
        user: { select: { id: true, name: true } },
        comments: true,
        files: { include: { file: true } },
        likes: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
      take: pagination.size,
      skip: pagination.size * pagination.page,
    })
  );

export const deleteUserPost = (userId: number, id: number) =>
  repo(() =>
    db.posts.deleteMany({
      where: {
        userId,
        id,
      },
    })
  );

export const findUserPostLike = (userId: number, id: number) =>
  repo(() =>
    db.postLikes.findFirst({
      where: {
        userId,
        id,
      },
    })
  );

export const incrementPostLike = (id: number, userId: number) =>
  repo(() =>
    db.posts.update({
      where: {
        id,
      },
      data: {
        noOfLikes: { increment: 1 },
        likes: { create: { user: { connect: { id: userId } } } },
      },
    })
  );

export const decrementPostLike = (id: number) =>
  repo(() =>
    db.posts.update({
      where: {
        id,
      },
      data: {
        noOfLikes: { decrement: 1 },
      },
    })
  );

export const removePostLike = (userId: number, id: number) =>
  repo(() =>
    db.postLikes.deleteMany({
      where: {
        userId,
        id,
      },
    })
  );
