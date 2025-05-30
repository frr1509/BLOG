import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { TableRow } from "../table-row/table-row";
import { useState } from "react";
import { useServerRequest } from "../../../../hooks";
import { PROP_TYPE } from "../../../../constans";

const UserRowContainer = ({
    className,
    id,
    roleId: userRoleId,
    login,
    registeredAt,
    roles,
    onUserRemove,
}) => {
    const [initialRoleId, setInitialRoleId] = useState(userRoleId);
    const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

    const requestServer = useServerRequest();

    const isSaveButtonDisabled = selectedRoleId === initialRoleId;

    const onRoleChange = ({ target }) => {
        setSelectedRoleId(Number(target.value));
    };
    const onSaveRole = (userId, newUserRoleId) => {
        requestServer("updateUserRole", userId, newUserRoleId).then(() => {
            setInitialRoleId(newUserRoleId);
        });
    };

    return (
        <div className={className}>
            <TableRow border={true}>
                <div className="login-column">{login}</div>
                <div className="registred-at-column">{registeredAt}</div>
                <div className="role-column">
                    <select value={selectedRoleId} onChange={onRoleChange}>
                        {roles.map(({ id: roleId, name: roleName }) => (
                            <option key={roleId} value={roleId}>
                                {roleName}
                            </option>
                        ))}
                    </select>
                    <Icon
                        inactive={true}
                        id="fa-floppy-o"
                        disabled={isSaveButtonDisabled}
                        margin="0 0 0 10px"
                        onClick={() => onSaveRole(id, selectedRoleId)}
                    />
                </div>
            </TableRow>
            <Icon
                inactive={true}
                id="fa fa-trash-o"
                margin="0 0 0 10px"
                onClick={onUserRemove}
            />
        </div>
    );
};

export const UserRow = styled(UserRowContainer)`
    display: flex;
    margin-top: 10px;

    & select {
        font-size: 16px;
        padding: 0 5px;
    }
`;

UserRow.propTypes = {
    id: PropTypes.string.isRequired,
    roleId: PROP_TYPE.ROLE_ID.isRequired,
    login: PropTypes.string.isRequired,
    registeredAt: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
    onUserRemove: PropTypes.func.isRequired,
};
