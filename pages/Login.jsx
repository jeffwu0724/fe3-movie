import React, {useContext, useEffect, useState} from "react";
import Idm from "../services/Idm";
import {useSession} from "../hook/Session";

const localStorage = require("local-storage");

const Login = ({history, location, match }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {session, setSession} = useSession();
    /**
     * Buttons have default behavior which will cause
     * the entire page to refresh, this isn't what
     * we want in React as everything updates according
     * to the state. So we prevent that action by
     * using "e.preventDefault();"
     *
     * @param e Event
     */


    const handleSubmit = (e) => {
        e.preventDefault();

        Idm.login(email, password)
            .then(response => {
                alert(JSON.stringify(response.data, null, 4))
                if (response.data?.resultCode === 120){
                    console.log("get the good resultcode")
                    console.log(response.data?.session_id)
                    history.push("index")
                    //history.push("/search", {session_id: response.data?.session_id})
                    //history.push("/search",{email: email})
                    localStorage.set("session", response.data?.session_id)
                    localStorage.set("email", email)
                }
            })
            .catch(error => alert(error));
    };
    return (
        <div className="form-box">
            <h1>Login </h1>
            <form onSubmit={handleSubmit}  >
                <label className="form-label">Email</label>
                <input
                    className="form-input"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label">Password</label>
                <input
                    className="form-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="form-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
