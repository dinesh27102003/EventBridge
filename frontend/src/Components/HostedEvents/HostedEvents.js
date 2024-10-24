import React, {useState,useEffect} from 'react'
import DashboardNavbar from '../Dashboard/DashboardNavbar'
import Axios from 'axios';
import { useLocation , useNavigate } from 'react-router-dom';
import './HostedEvents.css'


function HostedEvents() {
  const navigate = useNavigate();
  const [values,setValues] = useState([]);
  const location = useLocation();
  const modname = location.state.name;
  const chname=modname;
  console.log("This is the name ",modname);
  //const [isUpdated, setIsUpdated] = useState(true);
  useEffect(() => {
    Axios.get("http://localhost:3002/dashboard/hostedevents", {
      params: { name: modname }
    })
      .then((response) => {
        setValues(response.data);
        console.log("useffect ",modname);
        console.log("Value received");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const deleterecord = (event,eventid) =>{
    event.preventDefault();
    Axios.delete(`http://localhost:3002/dashboard/delete/${eventid}`);
  }
  return (
    <div>
      <DashboardNavbar name={modname}/>
      <div>
        <h2 className="font-weight-bold text-dark pt-3 pb-2 border-bottom border-4 border-primary mb-5">Events hosted by you {modname}</h2>
        <div className="card-columns">
          {values.map((item) => {
            return (
              <div className="card" key={item.EVENTID}>
                <div className="card-body">
                  <h5 className="card-title">{item.TITLE}</h5>
                  <p className="card-text">Venue: {item.VENUE}</p>
                  <p className="card-text">Date: {item.DATE}</p>
                  <p className="card-text">Timings: {item.TIMINGS}</p>
                  <p className="card-text">Accommodation Availability: {item.ACCOMMODATION}</p>
                  <p className="card-text">Type of Event: {item.TYPE}</p>
                </div>
                <div className="card-footer">
                <button className="btn btn-primary" onClick={(event) => {deleterecord(event,item.EVENTID)}}>Cancel</button>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HostedEvents