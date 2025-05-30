import { deleteComment, getPost } from "../api";
import { ROLE } from "../constans";
import { sessions } from "../sessions";
import { getCommentWitchAuthor } from "../utils";

export const removePostComment = async (hash, postId, id) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];
    const access = sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }
    await deleteComment(id);

    const post = await getPost(postId);

    const commentsWitchAuthor = await getCommentWitchAuthor(postId);

    return {
        error: null,
        res: {
            ...post,
            comments: commentsWitchAuthor,
        },
    };
};
