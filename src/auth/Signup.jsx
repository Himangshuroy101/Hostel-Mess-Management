import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");

  const [lastname, setLastName] = useState("");
  const [lastnameErr, setLastNameErr] = useState("");

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const [appliId, setAppliId] = useState("");
  const [iderror, setIderror] = useState("");

  const [address, setAddress] = useState("");
  const [courseDuration, setCourseDuration] = useState("");

  const [department, setDepartment] = useState("");
  const [deptnameerr, setDeptnameerr] = useState("");

  const [otp, setOtp] = useState("");
  const [otpmessage, setOtpmessage] = useState("");
  const [otpverified, setOtpverified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const validName = (value) => {
    setName(value);
    const nameRegex = /^[A-Za-z]+$/;
    setNameErr(!nameRegex.test(value) ? "Please enter valid name" : "");
  };

  const validLastName = (value) => {
    setLastName(value);
    const nameRegex = /^[A-Za-z]+$/;
    setLastNameErr(!nameRegex.test(value) ? "Please enter valid name" : "");
  };

  const validEmail = (value) => {
    setEmail(value);
    const gmailregex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    setEmailErr(!gmailregex.test(value) ? "Invalid email. Please enter valid email" : "");
  };

  const validPassword = (value) => {
    setPassword(value);
    setErr(value.length < 8 ? "Please enter at least 8 characters!" : "");
  };

  const validDepartment = (value) => {
    setDepartment(value);
    const regex = /^[A-Za-z\s]+$/;
    setDeptnameerr(!regex.test(value) ? "Please write valid dept name!" : "");
  };

  const handleApplicationId = (value) => {
    setAppliId(value);
    const regex = /^\d{6}$/;
    setIderror(!regex.test(value) ? "Application ID must be 6 digits" : "");
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!regex.test(email)) {
      setEmailErr("Invalid Gmail address");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5050/send-OTP", { email });
      setOtpmessage("OTP sent successfully!");
      setShowOtpField(true);
    } catch (err) {
      setOtpmessage("Failed to send OTP.");
      setShowOtpField(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/verify-OTP", { email, otp });
      setOtpmessage("OTP verified successfully!");
      setOtpverified(true);
      setShowOtpField(false);
      alert("OTP Verified.")
    } catch (err) {
      setOtpverified(false);
      setOtpmessage("Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !lastname || !email || !address || !password || !courseDuration || !appliId || !department) {
      alert("Please fill in all fields.");
      return;
    }

    if (nameErr || lastnameErr || emailErr || err || iderror || deptnameerr) {
      alert("Please correct validation errors before submitting.");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (!otpverified) {
      alert("Please verify OTP.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5050/register", {
        firstName: name,
        lastName: lastname,
        email,
        address,
        password,
        courseDuration,
        admissionId: appliId,
        department,
        termsAccepted,
      });

      console.log("Registration successful", res.data);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/request");

    } catch (err) {
      console.error("Registration failed", err.response?.data || err);
    }
  };

  return (
    <div className="signup container-fluid d-flex justify-content-center align-items-center">
      <div className="card p-5 shadow-lg" style={{ width: "750px" }}>
        <h3 className="text-center mb-4">Register Here</h3>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">First Name*</label>
              <input type="text" className="form-control" id="firstName" placeholder="Enter first name" value={name} onChange={(e) => validName(e.target.value)} required />
              {nameErr && <p style={{ color: 'red' }}>{nameErr}</p>}
            </div>

            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">Last Name*</label>
              <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={lastname} onChange={(e) => validLastName(e.target.value)} required />
              {lastnameErr && <p style={{ color: 'red' }}>{lastnameErr}</p>}
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">Address*</label>
              <textarea className="form-control" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} rows="2" required />
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">Email*</label>
              <input type="email" className="form-control mb-2" id="email" placeholder="Enter email" value={email} onChange={(e) => validEmail(e.target.value)} required />
              {emailErr && <p style={{ color: 'red' }}>{emailErr}</p>}
              <button className="btn btn-outline-primary" onClick={handleOTP} disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>

            {showOtpField && (
              <div className="col-12 text-center">
                <label htmlFor="otp" className="form-label">Enter OTP*</label>
                <input
                  type="text"
                  className="form-control mx-auto mb-2"
                  id="otp"
                  style={{
                    maxWidth: "300px",
                    fontSize: "1.2rem",
                    letterSpacing: "5px",
                    textAlign: "center",
                    border: "2px solid #0d6efd",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(13, 110, 253, 0.2)"
                  }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button className="btn btn-success mb-2" onClick={verifyOTP}>Verify OTP</button>
                {otpmessage && (
                  <p style={{ color: otpverified ? 'green' : 'red', fontWeight: '500' }}>{otpmessage}</p>
                )}
              </div>
            )}



            <div className="col-12">
              <label htmlFor="password" className="form-label">Password*</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => validPassword(e.target.value)} required />
              {err && <p style={{ color: 'red' }}>{err}</p>}
            </div>

            <div className="col-12">
              <label htmlFor="department" className="form-label">Department*</label>
              <input type="text" className="form-control" id="department" value={department} onChange={(e) => validDepartment(e.target.value)} required />
              {deptnameerr && <p style={{ color: 'red' }}>{deptnameerr}</p>}
            </div>

            <div className="col-md-4">
              <label htmlFor="duration" className="form-label">Course Duration*</label>
              <select className="form-select" id="duration" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} required>
                <option disabled value="">Choose year</option>
                <option>1 Year</option>
                <option>2 Year</option>
                <option>3 Year</option>
                <option>4 Year</option>
              </select>
            </div>

            <div className="col-md-8">
              <label htmlFor="admissionId" className="form-label">Admission ID*</label>
              <input type="text" className="form-control" id="admissionId" maxLength="6" value={appliId} onChange={(e) => handleApplicationId(e.target.value)} required />
              {iderror && <p style={{ color: 'red' }}>{iderror}</p>}
            </div>

            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="termsCheck" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
                <label className="form-check-label" htmlFor="termsCheck">
                  I agree to the <Link to="/terms">terms and conditions</Link>.
                </label>
              </div>
            </div>

            <div className="col-12 d-grid mt-3">
              <button type="submit" className="btn btn-primary">Sign up</button>
            </div>

            <div className="para col-12 text-center mt-3">
              <p>Already registered? <Link to="/login">Sign in</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
