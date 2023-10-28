import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username == "edrian" && password == "gwapo") {
            // Redirect to the dashboard on successful login
            nav("/dashboard");
        } else {
            alert("wrong");
        }
    }

    return (
        <div className="jumbotron-fluid" id="login">
            <div className="container bg-primary" id="one">
                <span className="text-light h1">Admin</span>
            </div>
            <div className="container" id="two">
                 <form>
                <div className="container">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn btn-primary" type="button" onClick={handleLogin}>
                        Log In
                    </button>
                </div>
            </form>
            </div>
           
        </div>
    );
}