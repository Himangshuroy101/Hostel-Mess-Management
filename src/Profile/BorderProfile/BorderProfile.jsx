import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Border.css'; // Custom styles

export default function BorderProfile() {
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
        <nav className="navbars">
            <div className="navbar-container">
                <div className="brand-section">
                    {/* Logo can be added here */}
                    <div>
                        <h5>Radhakrishnan Bhawan</h5>
                        <small>B.T Mens Hall</small>
                    </div>
                </div>

                <div className={`nav-links ${isOpen ? 'show' : ''}`}>
                    <Link to={`/profile/${userId}`} className="nav-user">
                        {user ? `${user.firstName} ${user.lastName}` : "Profile Name"}
                    </Link>

                    <img
                        src={"https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg"}
                        alt="profile"
                        className="profile-pic"
                    />

                    <Link to="/" className="logout-btn">
                        Logout
                    </Link>
                </div>

                <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>
        </nav>
    );
}
