import React, { useEffect, useState } from 'react';
import axios from "axios";
import Mealtable from './Mealtable';
import SummaryCard from './SummaryCard';
import "./ManagerProfile.css";
import {FaUser} from 'react-icons/fa';
import './SideBar.css';
// import BorderProfile from '../BorderProfile/BorderProfile';

const ManagerProfile = () => {
  const [summary, setSummary] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    {/* <BorderProfile/> */}
      <div className="app-container">
      <div className="sidebar">
            <FaUser className="user-icon" />
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
