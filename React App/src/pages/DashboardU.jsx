import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; 

const DashboardU = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard Page</h1>

            <footer className="cinema-footer">
                <div className="cinema-location">
                    <div className="cinema-address">
                        <FaMapMarkerAlt className="location-icon" /> 
                        Zona e re industriale, Albi Mall, Veternik, Prishinë
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DashboardU;