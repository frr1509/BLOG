import { tranformUser } from "../transforms";

export const getUser = async (loginToFind) =>
    fetch(`http://localhost:3005/users?login=${loginToFind}`)
        .then((loadedUser) => loadedUser.json())
        .then(([loadedUser]) => loadedUser && tranformUser(loadedUser));
