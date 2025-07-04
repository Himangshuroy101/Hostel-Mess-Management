import React, { useEffect, useState } from 'react';
import axios from "axios";
import Mealtable from './Mealtable';
import SummaryCard from './SummaryCard';
import "./ManagerProfile.css";
import './SideBar.css';
import { Link } from 'react-router-dom'; // ensure this is imported

const ManagerProfile = () => {
  const [summary, setSummary] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Dummy user for display (replace with real user logic if needed)
  const user = { firstName: "John", lastName: "Doe" };
  const userId = 1;

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryRes, studentRes] = await Promise.all([
          axios.get("/meals/summary"),
          axios.get("/students"),
        ]);

        setSummary(summaryRes.data);

        if (Array.isArray(studentRes.data)) {
          setStudents(studentRes.data);
        } else if (Array.isArray(studentRes.data.students)) {
          setStudents(studentRes.data.students);
        } else {
          console.warn("Unexpected student data format");
          setStudents([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <nav className="navbars navbar shadow-sm rounded bg-white p-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
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

      <div className="app-container">
        <div className="sidebar">
          <div className="user-icon-placeholder">👤</div> 
        </div>

        <div className="main-content">
          <h1 className="app-title">Meal Tracker</h1>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <>
              {/* --- Summary Section --- */}
              <div className="summary-grid">
                <div className="veg-card">
                  <SummaryCard title="Meal ON Students" value={summary.mealOnStudents} />
                  <SummaryCard title="Veg Meals" value={summary.totalActiveMeals?.veg} />
                </div>

                {/* --- Non-Veg Section --- */}
                <div className="nonveg-section">
                  <h2 className="nonveg-title">Non-Veg Meals</h2>
                  <div className="nonveg-cards">
                    <SummaryCard title="Total Non-veg meals" value={summary.totalActiveMeals?.nonveg?.total} />
                    <SummaryCard title="Chicken Meals" value={summary.totalActiveMeals?.nonveg?.chicken} />
                    <SummaryCard title="Fish Meals" value={summary.totalActiveMeals?.nonveg?.fish} />
                  </div>
                </div>
              </div>

              {/* --- Student Table --- */}
              <h1>Borders</h1>
              <Mealtable students={students} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagerProfile;
