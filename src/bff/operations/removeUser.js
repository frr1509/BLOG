import { deleteUser } from "../api";
import { ROLE } from "../constans";
import { sessions } from "../sessions";

export const removeUser = async (hash, userId) => {
    const accessRoles = [ROLE.ADMIN];

    const access = sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }
    deleteUser(userId);

    return {
        error: null,
        res: true,
    };
};
