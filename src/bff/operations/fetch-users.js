import { sessions } from "../sessions";
import { ROLE } from "../constans";
import { getUsers } from "../api";

export const fetchUsers = async (userSession) => {
    const accessRoles = [ROLE.ADMIN];

    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: "Доступ запрещен",
            res: null,
        };
    }
    const users = await getUsers();

    return {
        error: null,
        res: users,
    };
};
