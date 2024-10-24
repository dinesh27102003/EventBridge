import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import Validation from './SignupValidation'
import Axios from 'axios';
//import validation from './LoginValidation';
import ValidationEvent from './ValidationEvent';
import { useLocation } from 'react-router-dom';

function CreateEvent() {
    const location = useLocation();
    const modname = location.state.name;
    const [values,setvalues] = useState({
        title:'',
        name:modname,
        venue:'',
        date:'',
        email:'',
        accommodation:'',
        type:''
    })
    const navigate = useNavigate();
    const [errors,setErrors] = useState({});
    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(ValidationEvent(values));
        
        console.log("This is ",values.title,errors.name,errors.venue,errors.date);
        if(errors.title === "" && errors.name === ""){
            Axios.post('http://localhost:3002/dashboard/createevent',values)
            .then(res => {
                if(res.data === "Success"){
                    navigate('/dashboard/hostedevents',{state: {name: modname}});
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
    <div className='d-flex justify-content-center align-items-center bg-primary vh-250'>
        <div className='bg-white p-3 rounded w-25'>
            <h4 className='mt-3'>Event Details</h4>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Title</strong></label>
                    <input type="text" placeholder='Enter title' name='title' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.title && <span className='text-danger'>{errors.title}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Organizer Name</strong></label>
                    <input type="text" placeholder='Enter name' name='name' value={modname} onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Venue</strong></label>
                    <input type="text" placeholder='Enter venue' name='venue' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.venue && <span className='text-danger'>{errors.venue}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Date</strong></label>
                    <input type="text" placeholder='Enter date' name='date' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.date && <span className='text-danger'>{errors.date}</span>}
                    
                </div>
                
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Organizer Email</strong></label>
                    <input type="email" placeholder='Enter Organizer Email' name='email' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Accommodation</strong></label>
                    <input type="text" placeholder='Accommodation Availability' name='accommodation' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.accommodation && <span className='text-danger'>{errors.accommodation}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Type</strong></label>
                    <input type="text" placeholder='Enter type of event' name='type' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.type && <span className='text-danger'>{errors.type}</span>}
                    
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Create Event</strong></button>
                
            </form>
        </div>
    </div>
  )
}

export default CreateEvent;