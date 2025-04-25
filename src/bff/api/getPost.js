import { tranformPost } from "../transforms";

export const getPost = (postId) =>
    fetch(`http://localhost:3005/posts/${postId}`)
        .then((loadedPost) => loadedPost.json())
        .then((loadedPost) => loadedPost && tranformPost(loadedPost));
