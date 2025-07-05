import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Request.css'; // Custom styles

function Request() {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate("/");
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, [navigate]);

    return (
        <div className="request-wrapper">
            <div className="request-card fade-in-up">
                <h2>Request Sent</h2>
                <p>
                    Hello User,<br /><br />
                    Thank you for registering with us. Your request has been successfully sent to our admin team for approval.
                    Please be patient while we review your submission.<br /><br />
                    You will receive an approval email shortly.<br /><br />
                    <strong>Thanks for your cooperation!</strong>
                </p>
                <Link to="/" className="done-button">Done</Link>
                <p className="redirect-msg">You will be redirected shortly...</p>
            </div>
        </div>
    );
}

export default Request;
