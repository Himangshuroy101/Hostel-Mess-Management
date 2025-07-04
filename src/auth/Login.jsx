import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [serverErr, setServerErr] = useState("");

    const navigate = useNavigate();

    const validEmail = (value) => {
        setEmail(value);
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        setEmailErr(!gmailRegex.test(value) ? "Invalid email. Please enter a valid Gmail address." : "");
    };

    const validPassword = (value) => {
        setPassword(value);
        setErr(value.length < 8 ? "Password must be at least 8 characters long." : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerErr("");

        if (!email || !password ) {
            return alert("Please fill in all fields");
        }

        if (emailErr || err) {
            return alert("Please fix the form errors before submitting.");
        }

        try {
            const res = await axios.post("http://localhost:5050/login", {
                email,
                password,
            });

            const user = res.data.user;
            const userId = user?.id;
            const token = user?.token;

            if (userId && token == null) {
                localStorage.setItem("userId", userId);
                navigate(`/profile/${userId}`);
            } else if (userId && token === "Manager") {
                localStorage.setItem("userId", userId);
                navigate(`/ManagerProfile/${userId}`);
            } else {
                setServerErr("Unexpected response from server.");
            }
        } catch (error) {
            console.error("Login failed", error);
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Login failed. Please try again.";
            setServerErr(message);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h3>Login Here</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => validEmail(e.target.value)}
                            required
                        />
                        {emailErr && <p className="error-text">{emailErr}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => validPassword(e.target.value)}
                            required
                        />
                        {err && <p className="error-text">{err}</p>}
                    </div>

                    {serverErr && <p className="error-text">{serverErr}</p>}

                    <div className="form-group">
                        <button type="submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;