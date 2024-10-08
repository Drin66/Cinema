import React, { useState } from 'react';
import {
    FaTicketAlt,
    // FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    // FaCommentAlt,
    FaShoppingBag,
    FaFilm,
    FaBullhorn,
    FaSignInAlt,
    FaMapMarkerAlt,
    // FaSignInAlt,
    // FaUserPlus 
}from "react-icons/fa";

import { NavLink} from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        // {
        //     path:"/",
        //     name:"Dashboard",
        //     icon:<FaTh/>
        // },
        {
            path:"/location",
            name:"Location",
            icon:<FaMapMarkerAlt/>
        },
        {
            path:"/user",
            name:"User",
            icon:<FaUserAlt/>
        },
        {
            path:"/events",
            name:"Events",
            icon:<FaRegChartBar/>
        },
        {
            path:"/announcments",
            name:"Announcments",
            icon:<FaBullhorn/>
        },
        {
            path:"/movies",
            name:"Movies",
            icon:<FaFilm/>
        },
        {
            path:"/product",
            name:"Product",
            icon:<FaShoppingBag/>
        },
        {
            path:"/ticketsList",
            name:"Tickets List",
            icon:<FaTicketAlt/>
        },
        {
            path:"/login",
            name:"Log In",
            icon:<FaSignInAlt />
        },
    ]
    // const user = JSON.parse(localStorage.getItem('user'));

    return (
        
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo"><img src="logo.jpg" alt="" /></h1> */}
        
                  {/* <h1>Cinema</h1>  */}
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeClassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;