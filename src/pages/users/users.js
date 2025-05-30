import styled from "styled-components";
import { PrivatContent, H2 } from "../../components";
import { TableRow, UserRow } from "./components";
import { useServerRequest } from "../../hooks";
import { useEffect, useState } from "react";
import { ROLE } from "../../constans/roleId";
import { checkAccess } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../selecrtors";
import { CLOSE_MODAL, openModal } from "../../actions";

const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

    const userRole = useSelector(selectUserRole);
    const dispatch = useDispatch();

    const serverRequest = useServerRequest();

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        }

        Promise.all([
            serverRequest("fetchUsers"),
            serverRequest("fetchRoles"),
        ]).then(([userRes, rolesRes]) => {
            if (userRes.error || rolesRes.error) {
                setErrorMessage(userRes.error || rolesRes.error);
                return;
            }
            setUsers(userRes.res);
            setRoles(rolesRes.res);
        });
        serverRequest("fetchRoles");
    }, [serverRequest, shouldUpdateUserList, userRole]);

    const onUserRemove = (userId) => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
            return;
        }

        dispatch(
            openModal({
                text: "Вы точно хотите удалить пользователя?",
                onConfirm: () => {
                    serverRequest("removeUser", userId).then(() => {
                        setShouldUpdateUserList(!shouldUpdateUserList);
                    });
                    dispatch(CLOSE_MODAL);
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        );
    };

    return (
        <PrivatContent access={[ROLE.ADMIN]} serverError={errorMessage}>
            <div className={className}>
                <H2>Пользователи</H2>
                <div>
                    <TableRow>
                        <div className="login-column">Логин</div>
                        <div className="registred-at-column">
                            Дата регистрации
                        </div>
                        <div className="role-column">Роль</div>
                    </TableRow>
                    {users.map(({ id, login, registeredAt, roleId }) => (
                        <UserRow
                            key={id}
                            id={id}
                            roleId={roleId}
                            login={login}
                            registeredAt={registeredAt}
                            roles={roles.filter(
                                ({ id: roleId }) => roleId !== ROLE.GUEST,
                            )}
                            onUserRemove={() => onUserRemove(id)}
                        />
                    ))}
                </div>
            </div>
        </PrivatContent>
    );
};

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 570px;
    font-size: 18px;
`;
