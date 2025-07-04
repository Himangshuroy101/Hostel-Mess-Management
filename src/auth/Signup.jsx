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
      alert("OTP Verified.");
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
    <div className="signup-wrapper">
      <div className="signup-card">
        <h3>Register Here</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name*</label>
            <input type="text" value={name} onChange={(e) => validName(e.target.value)} required />
            {nameErr && <p className="error-text">{nameErr}</p>}
          </div>

          <div className="form-group">
            <label>Last Name*</label>
            <input type="text" value={lastname} onChange={(e) => validLastName(e.target.value)} required />
            {lastnameErr && <p className="error-text">{lastnameErr}</p>}
          </div>

          <div className="form-group">
            <label>Address*</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="2" required />
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input type="email" value={email} onChange={(e) => validEmail(e.target.value)} required />
            {emailErr && <p className="error-text">{emailErr}</p>}
            <button type="button" onClick={handleOTP} disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>

          {showOtpField && (
            <div className="form-group">
              <label>Enter OTP*</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required className="otp-input" />
              <button type="button" onClick={verifyOTP}>Verify OTP</button>
              {otpmessage && <p className={otpverified ? "success-text" : "error-text"}>{otpmessage}</p>}
            </div>
          )}

          <div className="form-group">
            <label>Password*</label>
            <input type="password" value={password} onChange={(e) => validPassword(e.target.value)} required />
            {err && <p className="error-text">{err}</p>}
          </div>

          <div className="form-group">
            <label>Department*</label>
            <input type="text" value={department} onChange={(e) => validDepartment(e.target.value)} required />
            {deptnameerr && <p className="error-text">{deptnameerr}</p>}
          </div>

          <div className="form-group">
            <label>Course Duration*</label>
            <select value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} required>
              <option value="">Choose year</option>
              <option>1 Year</option>
              <option>2 Year</option>
              <option>3 Year</option>
              <option>4 Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Admission ID*</label>
            <input type="text" maxLength="6" value={appliId} onChange={(e) => handleApplicationId(e.target.value)} required />
            {iderror && <p className="error-text">{iderror}</p>}
          </div>

          <div className="form-check">
            <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
            <label>I agree to the <Link to="/terms">terms and conditions</Link>.</label>
          </div>

          <div className="form-group">
            <button type="submit">Sign up</button>
          </div>

          <div className="form-footer">
            <p>Already registered? <Link to="/login">Sign in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
