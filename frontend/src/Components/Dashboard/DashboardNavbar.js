import React from 'react';
import './DashboardNavbar.css';
import {Link, useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';


function DashboardNavbar(props) {
  const navigate = useNavigate();

  const modname = props.name;
  const chname = modname;
  const tempname = chname;
  const creatname = tempname;
  const updname = creatname;
  console.log(modname);
  function handlelogout(){
    Axios.post("http://localhost:3002/dashboard")
    .then((res)=>{
        if(res.data === "Success"){
            navigate('/');
        }else{
            alert("Cannot log out");
        }
    })
    .catch((err)=> console.log(err));
}
  function hostedevents(){
    
    navigate('/dashboard/hostedevents',{state: {name: modname}});
  }
  function participatedevents(){
    navigate('/dashboard/participatedevents',{state: {name: chname}});
  }
  function createevent(){
    navigate('/dashboard/createevent',{state: {name: creatname}});
  }
  function upcomingEvents(){
    navigate('/dashboard/upcomingevents',{state: {name: tempname}});
  }
  function updateprofile(){
    navigate('/dashboard/updateprofile',{state: {name: updname}});
  }
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <Link to='/dashboard'>Eventbridge</Link>
      </div>
      <ul className='navbar-links'>
        <li><button className="btn btn-info" onClick={upcomingEvents}>Upcoming Events</button></li>
        <li><button className="btn btn-info" onClick={hostedevents}>Hosted Events</button></li>
        <li><button className="btn btn-info" onClick={participatedevents}>Participated Events</button></li>
        <li><button className="btn btn-info" onClick={createevent}>Create Event</button></li>
        <li><button className='btn btn-info' onClick={updateprofile}>Update Profile</button></li>
        <li><button className='btn btn-info' onClick={handlelogout}>Logout</button></li>
       
      </ul>
    </nav>
  );
}

export default DashboardNavbar;
