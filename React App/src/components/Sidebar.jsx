import React, { useState, useEffect } from 'react';
import {
    FaTicketAlt,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaShoppingBag,
    FaFilm,
    FaBullhorn,
    FaSignInAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3002')
            .then(res => {
                if (res.data.valid) {
                    setUserRole(res.data.role);
                } else {
                    navigate('/login');
                }
            })
            .catch(err => {
                console.error(err);
                navigate('/login');
            });
    }, [navigate]);

    const menuItem = [
        {
            path: userRole === 'admin' ? "/location" : "/locationU",
            name: "Location",
            icon: <FaMapMarkerAlt />
        },
        ...(userRole === 'admin' ? [{
            path: "/user",
            name: "User",
            icon: <FaUserAlt />
        }] : []),
        {
            path: userRole === 'admin' ? "/events" : "/eventsU",
            name: "Events",
            icon: <FaRegChartBar />
        },
        {
            path: userRole === 'admin' ? "/announcments" : "/announcmentsU",
            name: "Announcements",
            icon: <FaBullhorn />
        },
        {
            path: userRole === 'admin' ? "/movies" : "/moviesU",
            name: "Movies",
            icon: <FaFilm />
        },
        // ...(userRole === 'admin' ? [{
        //     path: "/product",
        //     name: "Product",
        //     icon: <FaShoppingBag />
        // }] : []),
        ...(userRole === 'admin' ? [{
            path: "/ticketsList",
            name: "Tickets List",
            icon: <FaTicketAlt />
        }] : []),
        {
            path: "/",
            name: "Home",
            icon: <FaSignInAlt />
        },
        // {
        //     path: userRole === 'admin' ? "/ligjeruesi" : "/ligjeruesi",
        //     name: "Ligjeruesi",
        //     icon: <FaUserAlt />
        // },
        // {
        //     path: userRole === 'admin' ? "/ligjerata" : "/ligjerata",
        //     name: "Ligjerata",
        //     icon: <FaRegChartBar />
        // },
    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
