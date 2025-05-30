import { addPost, updatePost } from "../api";
import { ROLE } from "../constans";
import { sessions } from "../sessions";

export const savePost = async (hash, newPostData) => {
    const accessRoles = [ROLE.ADMIN];

    const access = sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }
    const updatedPost =
        newPostData.id === ""
            ? await addPost(newPostData)
            : await updatePost(newPostData);

    return {
        error: null,
        res: updatedPost,
    };
};
