import { useState, useEffect } from "react";
import logo from '../assets/images/Logo.jpg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Border.css'; // Custom styles

export default function Navbar() {
    const { userId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (userId) {
                    const res = await axios.get(`http://localhost:5050/profile/${userId}`);
                    setUser(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch user", err);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <nav className="navbars navbar shadow-sm rounded bg-white p-3 mb-4">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="Radhakrishnan Bhawan logo" height={55} width={55} className="me-3 rounded-circle border" />
                    <div>
                        <h5 className="mb-0 fw-bold">Radhakrishnan Bhawan</h5>
                        <small className="text-muted">B.T Mens Hall</small>
                    </div>
                </div>

                <div className={`d-flex align-items-center ${isOpen ? 'd-block' : 'd-none d-md-flex'}`}>
                    <Link to={`/profile/${userId}`} className="me-3 text-decoration-none fw-medium">
                        {user ? `${user.firstName} ${user.lastName}` : "Profile Name"}
                    </Link>

                    <img
                        src={"https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg"}
                        alt="profile"
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />

                    <Link to="/" className="btn btn-outline-danger">
                        Logout <i className="fa-solid fa-right-from-bracket ms-1"></i>
                    </Link>
                </div>

                <div className="d-md-none">
                    <button className="btn btn-outline-secondary" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? "✖" : "☰"}
                    </button>
                </div>
            </div>
        </nav>
    );
}


