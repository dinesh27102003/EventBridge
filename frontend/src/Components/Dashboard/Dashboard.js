import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import DashboardNavbar from './DashboardNavbar';
import './Dashboard.css';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';

function Dashboard(props) {
  const [values, setValues] = useState([]);
  const location = useLocation();
  const emailid = location.state.email;
  console.log(emailid);
  const index = emailid.indexOf("@");
  const namep = emailid.slice(0,index);
  //console.log(namep);
  const modname = namep.charAt(0).toUpperCase() + namep.slice(1);
  console.log(modname);
  

  return (
    <div className='dashboard-container'>
      <DashboardNavbar name={modname}/>
      <h1>Welcome {modname}</h1>
      <p>This is your dashboard</p>
      <div className='dashboard-content'>
        <h2 className="font-weight-bold text-dark pt-3 pb-2 border-bottom border-4 border-primary mb-5 ml-5">Analytics to be displayed here</h2>

        
      </div>
    </div>
  )
}

export default Dashboard