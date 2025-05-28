import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Request.css'; // For custom animation

function Request() {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate("/");
    //     }, 5000); // 5 seconds

    //     return () => clearTimeout(timer); // Cleanup on unmount
    // }, [navigate]);

    return (
        <div className="bg-light d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow p-4 text-center fade-in-up" style={{ maxWidth: '500px' }}>
                <h2 className="mb-3">Request Sent</h2>
                <p className="text-secondary mb-3">
                    Hello User,<br /><br />
                    Thank you for registering with us. Your request has been successfully sent to our admin team for approval.
                    Please be patient while we review your submission.<br /><br />
                    You will receive an approval email shortly.<br /><br />
                    <strong>Thanks for your cooperation!</strong>
                </p>
                <Link to="/" className="btn btn-outline-success">Done</Link>
                <p className="mt-2 text-muted small">You will be redirected shortly...</p>
            </div>
        </div>
    );
}

export default Request;
