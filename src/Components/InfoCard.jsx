import React from 'react';
import "./Style/InfoCard.css";
function InfoCard() {
  return (
    <div className='info-card'>
        <div className='general-info'>
            <h3 className='info-heading'>General Information</h3>
            <span className='notice'><a href="./">Life at Radhakrishnan Bhawan</a></span>
            <span className='notice'><a href="./">List of Cultural Functions</a></span>
            <span className='notice'><a href="./">Hostel Rule's & Regulations</a></span>

        </div>

        <div className='admission-info'>
            <h3 className='info-heading'>Admission Information</h3>
            <span className='notice'><a href="./">Admission Brochure</a></span>
            <span className='notice'><a href="./">Hostel Fee Details</a></span>
            <span className='notice'><a href="./">General Information</a></span>
            
        </div>
    </div>
  )
}

export default InfoCard