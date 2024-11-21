import { useReducer, useState } from "react";

export default function Login() {

    const [token, setToken] = useReducer((state, event) => {
        if (event.login) {
            localStorage.setItem("token", event.token);
            return (event.token);
        }

        localStorage.removeItem("token");
        return undefined;

    }, undefined);

    function login() {
        setToken({ login: true, token: "1234" });
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>
            <p>.</p>
            <button onClick={login}>Login</button>
            <button onClick={() => setToken({})}>Logout</button>
        </div>
    );
}

