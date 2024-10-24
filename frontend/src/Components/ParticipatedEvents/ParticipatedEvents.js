import React,{useState,useEffect} from 'react'
import DashboardNavbar from '../Dashboard/DashboardNavbar'
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ParticipatedEvents.css'

function ParticipatedEvents() {
  
  const [values,setValues] = useState([]);
  const location = useLocation();
  const modname = location.state.name;
  console.log("This is the name ",modname);
  useEffect(() => {
    Axios.get("http://localhost:3002/dashboard/participatedevents", {
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
  return (
    <div>
      <DashboardNavbar name={modname}/>
      <div>
        <h2 className="font-weight-bold text-dark pt-3 pb-2 border-bottom border-4 border-primary mb-5">Events participated by {modname}</h2>
        <div className="card-columns">
          {values.map((item) => {
            return (
              <div className="card" key={item.eventid}>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Venue: {item.venue}</p>
                  <p className="card-text">Date: {item.date}</p>
                  <p className="card-text">Timings: {item.timings}</p>
                  <p className="card-text">Accommodation Availability: {item.accommodation}</p>
                  <p className="card-text">Type of event: {item.type}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ParticipatedEvents