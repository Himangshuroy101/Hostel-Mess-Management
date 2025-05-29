// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./Border.css";

// function BorderProfile() {
//     const [name, setName] = useState("");
//     const [lastname, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [mealDays, setMealDays] = useState([]);
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [searchTerm, setSearchTerm] = useState("");
//     const [mealOn, setMealOn] = useState(true);

//     const handleSearch = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5173/profile`, {
//                 params: { search: searchTerm }
//             });

//             const user = response.data;

//             setName(user.firstName);
//             setLastName(user.lastName);
//             setEmail(user.email);
//             setMealDays(user.mealDays || []);
//         } catch (err) {
//             console.error("Failed to fetch profile:", err);
//         }
//     };

//     const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

//     const changeMonth = (offset) => {
//         const newDate = new Date(currentDate);
//         newDate.setMonth(newDate.getMonth() + offset);
//         setCurrentDate(newDate);
//     };

//     const toggleMealDay = (day) => {
//         setMealDays((prev) =>
//             prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//         );
//         // Optional: Send update to backend
//         // axios.post("/api/updateMealDay", { email, day, action: "toggle" });
//     };

//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const daysInMonth = getDaysInMonth(year, month);
//     const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//     return (
//         <>
//             {/* Sticky Header */}
//             <header className="sticky-top bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center">
//                     <img
//                         src=""
//                         alt="Logo"
//                         style={{ height: "40px", marginRight: "10px" }}
//                     />
//                     <h5 className="m-0">BT MENS</h5>
//                 </div>
//                 <nav className="d-flex align-items-center gap-3">
//                     <ul className="list-unstyled d-flex m-0 me-3">
//                         <li><a href="/" className="text-decoration-none px-2">Home</a></li>
//                     </ul>
//                     <form
//                         className="d-flex"
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             handleSearch();
//                         }}
//                     >
//                         <input
//                             type="text"
//                             placeholder="Search Profile..."
//                             className="form-control"
//                             style={{ width: "200px" }}
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <button type="submit" className="btn btn-primary ms-2">Search</button>
//                     </form>
//                 </nav>
//             </header>

//             {/* Main Content */}
//             <div className="profile-page container-fluid vh-100 mt-3">
//                 <div className="row h-100 g-4">
//                     {/* Left Card */}
//                     <div className="leftcard col-md-4 col-12 d-flex">
//                         <div className="card shadow-lg p-4 w-100 d-flex flex-column align-items-center justify-content-center animated-fade-in h-100">
//                             <img
//                                 className="rounded-circle mx-auto d-block img-fluid mb-5"
//                                 style={{ width: "150px" }}
//                                 src="https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg"
//                                 alt="profile"
//                             />
//                             <h3 className="text-center mb-3">
//                                 {name ? `${name} ${lastname}` : "User Name"}
//                             </h3>
//                             <h5 className="text-center text-muted mb-2">DETS</h5>
//                             <p className="text-center text-secondary mb-4">2023 - 2027</p>
//                             <hr />
//                             <div className="text-center mt-3 email-link">
//                                 <i className="fa-solid fa-envelope me-2"></i>
//                                 <a
//                                     href={`mailto:${email}`}
//                                     className="text-decoration-none mb-2"
//                                 >
//                                     {email || "user@gmail.com"}
//                                 </a>
//                                 <br />
//                                 <a href="/" className="text-decoration-none">http://localhost:5173/</a>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Card */}
//                     <div className="rightcard col-md-8 col-12 d-flex flex-column align-items-center">
//                         {/* Meal Toggle */}
//                         <div className="card shadow-lg p-4 w-100 d-flex flex-column justify-content-center animated-slide-up mb-4">
//                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                 <label className="form-check-label fs-5" htmlFor="switchCheckChecked">Meal ON</label>
//                                 <div className="form-check form-switch">
//                                     <input
//                                         className="form-check-input"
//                                         type="checkbox"
//                                         role="switch"
//                                         id="switchCheckChecked"
//                                         checked={mealOn}
//                                         onChange={() => setMealOn(!mealOn)}
//                                     />
//                                 </div>
//                             </div>
//                             <hr />
//                             <p className="text-muted">Toggle your meal availability status above.</p>
//                         </div>

//                         {/* Meal Calendar */}
//                         <div className="card shadow-lg p-4 w-100 animated-slide-up">
//                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                 <button className="btn btn-outline-secondary" onClick={() => changeMonth(-1)}>&lt;</button>
//                                 <h5 className="mb-0">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h5>
//                                 <button className="btn btn-outline-secondary" onClick={() => changeMonth(1)}>&gt;</button>
//                             </div>
//                             <div className="d-flex flex-wrap">
//                                 {calendarDays.map(day => (
//                                     <div
//                                         key={day}
//                                         onClick={() => toggleMealDay(day)}
//                                         className={`border rounded m-1 text-center p-2 ${mealDays.includes(day) ? "bg-success text-white" : ""}`}
//                                         style={{ width: "14.28%", cursor: "pointer" }}
//                                     >
//                                         {day}
//                                     </div>
//                                 ))}
//                             </div>
//                             <p className="mt-3 text-muted">Green days indicate when you ate your meal.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default BorderProfile;


import { useState, useEffect } from "react";
import logo from '../assets/images/Logo.jpg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
    const {userId} = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     // const userId = localStorage.getItem("userId");
        
    //         if (userId) {
    //             axios.get(`http://localhost:5050/profile/${userId}`, {
    
    //         })
    //         .then((res) => setUser(res.data))
    //         .catch((err) => console.log("Failed to fetch user", err));
    //         }
    //     // }catch(err){
    //     //     console.log("Sorry for inconvinience", err);
    //     // }
    // }, [userId]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (userId) {
                    const res = await axios.get(`http://localhost:5050/profile/${userId}`);
                    setUser(res.data);
                }
            } catch (err) {
                console.log("Failed to fetch user", err);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <nav className="navbar">
        <div className="container">
            <div className="logo-container">
            <div className="logo">
                <img src={logo} alt="Radhakrishnan Bhawan logo" height={55} width={55} />
            </div>
            <div className="navHeading">
                <a className="headingName" href="#">Radhakrishnan Bhawan</a>
                <a className="subHeading">B.T Mens Hall</a>
            </div>
            </div>

            <div className={`nav-links ${isOpen ? "active" : ""}`}>
            <Link to="/profile/:userId">{user ? `${user.firstName} ${user.lastName}` : "Profile Name"}</Link>
            <img
                className="rounded-circle mx-auto d-block img-fluid"
                style={{ width: "50px" }}
                src={user?.profilePicture || "https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg"}
                alt={user?.name || "profile"}
            />
            <div className="buttons">
                <button className="signup">
                <Link to="/">
                    Logout <i className="fa-solid fa-right-from-bracket"></i>
                </Link>
                </button>
            </div>
            </div>

            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
            </div>
        </div>
        </nav>
    );
}

