import {
  Service,
  response,
  updatePostData,
  postData,
  databaseError,
  updatePagination,
  PaginatedData,
  PostFilters,
  likeFilters,
} from "../utils";
import { service } from "../core";
import {
  countPosts,
  countUserPosts,
  createPost,
  decrementPostLike,
  deleteUserPost,
  findPost,
  findPosts,
  findUserPost,
  findUserPostLike,
  findUserPosts,
  incrementPostLike,
  removePostLike,
  updatePost,
} from "../repos";

export const savePost: Service<postData> = ({ validatedData, user }) =>
  service(async () => {
    if (!user?.id) return response.serverError();
    const { post, photos } = validatedData;
    let postMedia;
    if (photos) {
      postMedia = photos.map((photo) => {
        return { fileId: photo };
      });
    }

    const { data, error } = await createPost(user.id, post, postMedia);

    if (error) return response.failed(error);
    if (!data) return response.serverError(databaseError);

    return response.created(data, "Post added successfully.");
  });

export const modifyPost: Service<updatePostData> = ({
  validatedData,
  user,
  id,
}) =>
  service(async () => {
    if (!user?.id) return response.serverError();
    const { post, photos } = validatedData;
    let postMedia;
    if (photos) {
      postMedia = photos.map((photo) => {
        return { fileId: photo };
      });
    }
    const { data: userPost, error: postError } = await findUserPost(
      user.id,
      id
    );
    if (postError) return response.serverError(postError);
    if (!userPost) return response.notFound("post");

    const { data, error } = await updatePost(id, post, postMedia);
    if (error) return response.failed(error);

    return response.success(data, "Post updated successfully");
  });

export const fetchAllPosts: Service<unknown, unknown, PostFilters> = ({
  filters,
  pagination,
}) =>
  service(async () => {
    const { post } = filters;
    const { data, error } = await findPosts(post, pagination);

    if (error) return response.serverError(error);
    const { data: totalPosts } = await countPosts(post);

    const responseData: PaginatedData<unknown> = {
      results: data,
      pagination: updatePagination(pagination, totalPosts ?? 0),
    };

    return response.success(responseData, "Posts fetched successfully");
  });

export const fetchAllUserPosts: Service<unknown, unknown, PostFilters> = ({
  id,
  pagination,
  filters,
}) =>
  service(async () => {
    const { post } = filters;
    const { data, error } = await findUserPosts(id, post, pagination);
    if (error) return response.serverError(error);
    const { data: totalPosts } = await countUserPosts(id, post);

    const responseData: PaginatedData<unknown> = {
      results: data,
      pagination: updatePagination(pagination, totalPosts ?? 0),
    };
    return response.success(responseData, "Posts fetched successfully");
  });

export const fetchPostById: Service = ({ id }) =>
  service(async () => {
    const { data, error } = await findPost(id);
    if (!data) return response.notFound("post does not exist");
    if (error) return response.serverError(error);
    return response.success(data, "Post fetched successfully");
  });

export const removePost: Service = ({ user, id }) =>
  service(async () => {
    if (!user) return response.serverError();

    const { error } = await deleteUserPost(user.id, id);
    if (error) return response.serverError(error);

    return response.success("Post deleted successfully");
  });

export const likeUnlikePost: Service<unknown, unknown, likeFilters> = ({
  user,
  id,
  filters,
}) =>
  service(async () => {
    if (!user) return response.serverError();
    const { type } = filters;

    const { data, error: postError } = await findPost(id);
    if (!data) return response.notFound("post does not exist");
    if (postError) return response.serverError(postError);

    if (type === "like") {
      const { data, error } = await findUserPostLike(user.id, id);
      if (error) return response.serverError(error);
      if (data)
        return response.conflict("sorry you have already liked this post.");
      await incrementPostLike(id, user.id);
    }

    if (type === "unlike") {
      const { data, error } = await findUserPostLike(user.id, id);
      if (error) return response.serverError(error);
      if (!data) return response.conflict("sorry you have not like this post.");
      await decrementPostLike(id);
      await removePostLike(user.id, id);
    }

    return response.success("Postlikes updated successfully");
  });
