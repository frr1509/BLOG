import { ACTION_TYPE } from "./actionType";
import { server } from "../bff";

export const logout = (session) => {
    server.logout(session);

    return {
        type: ACTION_TYPE.LOGOUT,
    };
};
