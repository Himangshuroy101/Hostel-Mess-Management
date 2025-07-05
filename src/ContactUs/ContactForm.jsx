import React, { useState } from "react";
import axios from "axios";

function ContactForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!isValidEmail(trimmedData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5050/send-email", trimmedData);
      alert(response.data.message);
      setFormData({ username: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert(
        error.response?.data?.message || "Failed to send message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const mapLink =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.3806572707267!2d88.43156537509029!3d22.973025729208533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f895005d1b5ab7%3A0xac7e734c7f60a8a6!2sRADHAKRISHNAN%20BHAWAN%20(B.T.%20MEN%27S%20HALL)!5e0!3m2!1sen!2sin!4v1747980905227!5m2!1sen!2sin";

  const phone = "+916294769803";
  const whatsapp = "6294769803"
  const Hostel = "BT Mens";
  const Warden = "Supriyo Ghoshal";
  const ManagerContact = "+916294769803";

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center py-5 bg-light">
        <div className="row w-100 justify-content-center align-items-center g-5">
          {/* Contact Form */}
          <div className="col-lg-6 col-md-8">
            <h3 className="mb-4 text-center">📬 Contact Us</h3>
            <form onSubmit={handleSubmit} noValidate className="bg-white p-4 shadow rounded">
              <div className="mb-3">
                <label htmlFor="username" className="form-label"><strong>Name</strong></label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Your Name"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label"><strong>Message</strong></label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="5"
                  required
                />
              </div>

              <div className="text-center">
                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info Card */}
          <div className="col-lg-4 col-md-8">
            <div className="card shadow bg-white">
              <div className="card-header text-center bg-dark text-white">
                <strong>📌 Hostel Contact Info</strong>
              </div>
              <div className="card-body">
                <p><strong>🏠 Address:</strong><br />BT Mens Hostel, BT Road, near Central Park</p>
                <p><strong>📞 Phone:</strong> <a href={`tel:${phone}`} className="text-decoration-none">{phone}</a></p>
                <p><strong>✉️ Email:</strong> <a href="mailto:BTmens@gmail.com" className="text-decoration-none">BTmens@gmail.com</a></p>
                <p><strong>💬 WhatsApp:</strong> <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm">Chat on WhatsApp</a></p>
              </div>
              <div className="card-footer bg-transparent border-top">
                <h5 className="text-secondary">🏢 Manager Info</h5>
                <p><strong>Name:</strong> {Warden}</p>
                <p><strong>📞 Contact:</strong> <a href={`tel:${ManagerContact}`} className="text-decoration-none">{ManagerContact}</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="row w-100 mt-5">
          <div className="col">
            <h4 className="mb-3 text-center">🗺️ Location Map</h4>
            <div className="ratio ratio-16x9">
              <iframe
                src={mapLink}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="hostel-map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
