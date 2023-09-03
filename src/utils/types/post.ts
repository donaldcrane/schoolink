export interface postData {
  post: string;
  photos: number[];
}

export interface PhotoData {
  id?: number;
  fileId: number;
}
export interface updatePostData {
  post?: string;
  photos?: number[];
}

export interface updateCommentData {
  comment: string;
}

export interface commentData {
  comment: string;
  postId: number;
}

export interface PostFilters {
  post: string;
}
export interface likeFilters {
  type: string;
}
