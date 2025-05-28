import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        setServerErr(""); // clear any previous server errors

        if (!email || !password) {
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

            const userId = res.data.user?.id;

            if (userId) {

                localStorage.setItem("userId", userId);

                navigate(`/profile/${userId}`);
            } else {
                setServerErr("Unexpected response from server.");
            }
        } catch (error) {
            console.error("Login failed", error);
            const message = error.response?.data?.error || error.response?.data?.message || "Login failed. Please try again.";
            setServerErr(message);
        }
    };

    return (
        <div className="login container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5 shadow-lg" style={{ width: "400px" }}>
                <h3 className="text-center mb-4">Login Here</h3>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email*</label>
                            <input
                                type="email"
                                className="form-control mb-2"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => validEmail(e.target.value)}
                                required
                            />
                            {emailErr && <p className="text-danger">{emailErr}</p>}
                        </div>

                        <div className="col-12">
                            <label htmlFor="password" className="form-label">Password*</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => validPassword(e.target.value)}
                                required
                            />
                            {err && <p className="text-danger">{err}</p>}
                        </div>

                        {serverErr && <p className="text-danger mt-2">{serverErr}</p>}

                        <div className="col-12 d-grid mt-3">
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
