import {
    authorize,
    fetchRoles,
    logout,
    register,
    fetchUsers,
    updateUserRole,
    removeUser,
} from "./operations";

export const server = {
    register,
    logout,
    authorize,
    fetchRoles,
    fetchUsers,
    updateUserRole,
    removeUser,
};
