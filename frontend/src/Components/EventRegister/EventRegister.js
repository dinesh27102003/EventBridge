import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import Validation from './SignupValidation'
import Axios from 'axios';
//import validation from './LoginValidation';
import ValidationEvent from './RegisterValidation';
import { useLocation } from 'react-router-dom';

function EventRegister() {
    /*const location = useLocation();
    const modname = location.state.name;
    const eventidc = location.state.eventid;
    console.log("Modname is ",modname);
    console.log("Eventid is ",eventidc);*/
    const location = useLocation();
    const eveid = location.state.eventid;
    const chname = location.state.name;
    const [values,setvalues] = useState({
        eventid:eveid,
        name:'',
        email:'',
        accommodation:'',
        age:''
    })
    
   console.log("Eventid = ",eveid);
   console.log("Obtained name= ",chname);
    const navigate = useNavigate();
    const [errors,setErrors] = useState({});
    //console.log("Obtained eventid: ",values.eventid);
    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(ValidationEvent(values));
        
        console.log("This is ",errors.eventid,errors.name,errors.email,errors.accommodation,errors.age);
        if(errors.name === "" && errors.email === ""){
            console.log("Values are ",values.email," Age: ",values.age);
            Axios.post("http://localhost:3002/dashboard/eventregister",values)
            .then(res => {
                console.log("Result's data is ",res.data);
                if(res.data === "Success"){
                    navigate('/dashboard/upcomingevents',{state: {name: chname}});
                }else{
                    alert("Invalid credentials");
                }
            })
            .catch(err=> console.log(err));
            
        }
    }
    const handleInput = (event) =>{
        setvalues(prev => ({...prev, [event.target.name]: [event.target.value]}));
        
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-150'>
        <div className='bg-white p-3 rounded w-25'>
            <h4 className='mt-3'>Event Registration</h4>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>EventID</strong></label>
                    <input type="text" placeholder='' name='eventid' value={eveid} onChange={handleInput} className='form-control rounded-0'/>
                    {errors.eventid && <span className='text-danger'>{errors.eventid}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Attendee Name</strong></label>
                    <input type="text" placeholder='Enter name' name='name' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Attendee Email</strong></label>
                    <input type="text" placeholder='Enter email' name='email' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                    
                </div>
                
                
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Accommodation Required</strong></label>
                    <input type="text" placeholder='Accommodation Requirement' name='accommodation' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.accommodation && <span className='text-danger'>{errors.accommodation}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Attendee Age</strong></label>
                    <input type="text" placeholder='Enter age' name='age' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.age && <span className='text-danger'>{errors.age}</span>}
                    
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Register</strong></button>
                
            </form>
        </div>
    </div>
  )
}

export default EventRegister;