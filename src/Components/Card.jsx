import React from "react";
import "./Style/Card.css";
import profileImg from "../assets/images/provost-img.jpg"; // Replace with your local image
import blankProf from "../assets/images/blank-profile.jpg";

const Card = () => {
  return (
    <div>
   
    <div className="card">
      {/* Left Section */}
      <div className="card-left">
        <img src={profileImg} alt="Profile" className="profile-img" />
        <span className="provost-name">Prof. Anindya Bandyopadhyay</span>
        <span className="designation">Provost</span>
      </div>

      {/* Right Section */}
      <div className="card-right">
        <h2 className="card-title">Provost Desk</h2>
        <p className="card-description">
        Exercitation elit duis quis nulla. Lorem duis consectetur consequat culpa. Tempor ut fugiat culpa aliquip Lorem velit laboris quis. Fugiat sit labore veniam magna mollit labore est nostrud incididunt ea esse culpa.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
        </p>
        <button className="read-more">Read More</button>
      </div>
    </div>


 {/* Stuart section */}
<div className="card">
      {/* Left Section */}
      <div className="card-left">
        <img src={blankProf} alt="Profile" className="profile-img" />
        <span className="provost-name">Bikash Maity</span>
        <span className="designation">Stuart</span>
      </div>

      {/* Right Section */}
      <div className="card-right">
        <h2 className="card-title">Stuart Desk</h2>
        <p className="card-description">
        Exercitation elit duis quis nulla. Lorem duis consectetur consequat culpa. Tempor ut fugiat culpa aliquip Lorem velit laboris quis. Fugiat sit labore veniam magna mollit labore est nostrud incididunt ea esse culpa.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s 
        </p>
        <button className="read-more">Read More</button>
      </div>
    </div>
    </div>
    
  );
};

export default Card;
