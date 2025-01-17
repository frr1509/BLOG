import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, H2, Input } from "../../components";
import { Link, Navigate } from "react-router-dom";
import { server } from "../../bff";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selecrtors";
import { ROLE } from "../../constans/roleId";

const authSchemeForm = yup.object().shape({
    login: yup
        .string()
        .required("Поле обязательно для заполнения")
        .matches(
            /^\w+$/,
            "Неверно заполнен логин. Допускаются только буквы и цыфры",
        )
        .min(3, "Минумум 3 смвола")
        .max(15, "Максимум 15 символов"),
    password: yup
        .string()
        .required("Поле обязательно для заполнения")
        .matches(
            /^[\w#%]+$/,
            "Неверно заполнен пароль. Допускаются буквы, цыфры и знаки #,%.",
        )
        .min(6, "Минимун 6 символов")
        .max(30, "Максимум 30 символов"),
});

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: underline;
    margin: 20px 0;
    font-size: 18px;
`;

const ErrorMessage = styled.div`
    background-color: #fcadad;
    font-size: 18px;
    margin: 10px 0 0;
    padding: 10px;
`;

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authSchemeForm),
    });

    const [serverError, setServerError] = useState(null);

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }

            dispatch(setUser(res));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = formError || serverError;

    const dispatch = useDispatch();

    const store = useStore();

    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout;

        return store.subscribe(() => {
            let prevWasLogout = currentWasLogout;
            currentWasLogout = store.getState().app.wasLogout;

            if (currentWasLogout !== prevWasLogout) {
                reset();
            }
        });
    }, [reset, store]);

    const roleId = useSelector(selectUserRole);

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Авторизация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Логин..."
                    {...register("login", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Input
                    type="password"
                    placeholder="Пароль..."
                    {...register("password", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" disabled={!!formError}>
                    Авторизоваться
                </Button>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <StyledLink to="/register">Регистрация</StyledLink>
            </form>
        </div>
    );
};

export const Authorization = styled(AuthorizationContainer)`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`;
