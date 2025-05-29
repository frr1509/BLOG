import { getPost } from "../api";
import { getCommentWitchAuthor } from "../utils";

export const fetchPost = async (postId) => {
    let post;
    let error;

    try {
        post = await getPost(postId);
    } catch (postError) {
        error = postError;
    }

    if (error) {
        return {
            error,
            res: null,
        };
    }

    const commentsWithAuthor = await getCommentWitchAuthor(postId);

    return {
        error: null,
        res: { ...post, comments: commentsWithAuthor },
    };
};
