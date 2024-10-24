import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import ValidationEvent from './UpdateValidation';


function UpdateProfile() {
    const location = useLocation();
    const modname = location.state.name;
    const [upvalues,setupvalues] = useState([]);

    const [values,setvalues] = useState({
        id: 0,
        name: '',
        age: 0,
        email:'',
        password:'',
        prevname: modname
    });
    const navigate = useNavigate();
    const [errors,setErrors] = useState({});
    useEffect(() => {
        Axios.get("http://localhost:3002/dashboard/updateprofile/fetch", {
      params: { name: modname }
    })
      .then((response) => {
        const chvalues=[
            response.data[0].id,
            response.data[0].Name,
            response.data[0].Age,
            response.data[0].Email,
            response.data[0].password
        ]

        console.log(response.data);
        console.log("changevalues= ",chvalues);
        setupvalues(chvalues);
        console.log("useffect ",modname);
        console.log("Value received");
        console.log("Upvalues: ",upvalues[0],' ',upvalues[1],' ',upvalues[2],' ',upvalues[3]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(ValidationEvent(values));
        
        console.log("This is ",errors.id,errors.name,errors.age,errors.email,errors.password);
        if(errors.name === "" && errors.email === ""){
            console.log("Previous name is ",values.prevname);
            console.log("Values are ",values.email," Age: ",values.age);
            Axios.post("http://localhost:3002/dashboard/updateprofile/update",values)
            .then(res => {
                console.log("Result's data is ",res.data);
                const finalname = values.name;
                if(res.data === "Success"){
                    navigate('/dashboard/upcomingevents',{state: {name: finalname}});
                }else{
                    alert("Update not done");
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
            <h4 className='mt-3'>Update Profile</h4>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>User Id</strong></label>
                    <input type="text" placeholder='' name='id' value={upvalues[0]} onChange={handleInput} className='form-control rounded-0'/>
                    {errors.id && <span className='text-danger'>{errors.id}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Name</strong></label>
                    <input type="text" placeholder={upvalues[1]} name='name' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>User Email</strong></label>
                    <input type="text" placeholder={upvalues[3]} name='email' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                    
                </div>
                
                
                
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Age</strong></label>
                    <input type="text" placeholder={upvalues[2]} name='age' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.age && <span className='text-danger'>{errors.age}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Password</strong></label>
                    <input type="text" placeholder='Password' name='password' value={upvalues[4]} onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                    
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Update</strong></button>
                
            </form>
        </div>
    </div>
  )
}

export default UpdateProfile