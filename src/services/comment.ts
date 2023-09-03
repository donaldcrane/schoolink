import {
  Service,
  response,
  databaseError,
  updateCommentData,
  commentData,
} from "../utils";
import { service } from "../core";
import {
  createComment,
  deleteUserComment,
  findPost,
  findUserComment,
  updateComment,
} from "../repos";

export const saveComment: Service<commentData> = ({ validatedData, user }) =>
  service(async () => {
    if (!user?.id) return response.serverError();
    const { data: postData, error: postError } = await findPost(
      validatedData.postId
    );
    if (!postData) return response.notFound("post does not exist");
    if (postError) return response.serverError(postError);

    const { data, error } = await createComment(user.id, validatedData);

    if (error) return response.failed(error);
    if (!data) return response.serverError(databaseError);

    return response.created(data, "Comment added successfully.");
  });

export const modifyComment: Service<updateCommentData> = ({
  validatedData,
  user,
  id,
}) =>
  service(async () => {
    if (!user?.id) return response.serverError();
    const { comment } = validatedData;

    const { data: userComment, error: commentError } = await findUserComment(
      user.id,
      id
    );
    if (commentError) return response.serverError(commentError);
    if (!userComment) return response.notFound("comment");
    const { data, error } = await updateComment(id, comment);
    if (error) return response.failed(error);

    return response.success(data, "Comment updated successfully.");
  });

export const removeComment: Service = ({ user, id }) =>
  service(async () => {
    if (!user) return response.serverError();

    const { error } = await deleteUserComment(user.id, id);
    if (error) return response.serverError(error);

    return response.success("Comment deleted successfully.");
  });
