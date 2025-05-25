import { tranformPost } from "../transforms";

export const getPosts = () =>
    fetch("http://localhost:3005/posts")
        .then((loadedPosts) => loadedPosts.json())
        .then((loadedPosts) => loadedPosts && loadedPosts.map(tranformPost));
