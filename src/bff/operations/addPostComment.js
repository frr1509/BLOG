import { addComment, getComments, getPost } from "../api";
import { ROLE } from "../constans";
import { sessions } from "../sessions";
import { getCommentWitchAuthor } from "../utils";

export const addPostComment = async (hash, userId, postId, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];
    const access = sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }
    await addComment(userId, postId, content);

    const post = await getPost(postId);

    const commentWitchAurhor = await getCommentWitchAuthor(postId);

    return {
        error: null,
        res: {
            ...post,
            comments: commentWitchAurhor,
        },
    };
};
