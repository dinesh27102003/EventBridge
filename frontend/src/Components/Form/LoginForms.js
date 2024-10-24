import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
//import validation from './LoginValidation';
import Axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';

function LoginForms() {
  const [values, setvalues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [emails, setEmail] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (errors.email === '' && errors.password === '') {
      Axios.post('http://localhost:3002/login', values)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.email);
            const emailid = res.data.email;
            setEmail(res.data.email);
            console.log('Value of email: ',emails);
            
            navigate('/dashboard',{state: {email: emailid}});
            
          } else {
            alert('Invalid credentials');
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleInput = (event) =>{
    setvalues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    
}
return (
<>

<div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
    <div className='bg-white p-3 rounded w-25'>
        <h4>Login</h4>
        <form action="" onSubmit={handleSubmit}>
            
            <div className='mb-3'>
                <label className='d-flex justify-content-left align-items-left mb-2'><strong>Email</strong></label>
                <input type="email" name='email' placeholder='Enter email' onChange={handleInput} className='form-control rounded-0'/>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            
            <div className='mb-3'>
                <label className='d-flex justify-content-left align-items-left mb-2'><strong>Password</strong></label>
                <input type="password" name='password' placeholder='Enter password' onChange={handleInput} className='form-control rounded-0'/>
                {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0 mb-4'><strong>Login</strong></button>
            <p className='d-flex justify-content-center align-items-center'>If you are a new user, click below</p>
            <Link to='/signup' className='btn btn-default border w-100 bg-light text-decoration-none'>Register</Link>
        </form>
    </div>
</div>
</>
)
}

export default LoginForms;