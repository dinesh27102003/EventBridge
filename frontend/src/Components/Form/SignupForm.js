import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import Axios from 'axios'
import validation from './LoginValidation';

function SignupForm() {
    const [values,setvalues] = useState({
        name:'',
        age:0,
        email:'',
        password:''
    });
    const navigate = useNavigate();
    const [errors,setErrors] = useState({});
    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(Validation(values))
        if(errors.name==="" && errors.age==="" && errors.email==="" && errors.password===""){
            Axios.post('http://localhost:3002/signup',values)
                .then(res => {
                    console.log(res.data);
                    if(res.data.success){
                        navigate('/login');
                    }else{
                        alert(res.data.message);
                    }
                })
                .catch(err => console.log(err));
        }
    }
    const handleInput = (event) =>{
        setvalues(prev => ({...prev, [event.target.name]: [event.target.value]}));
        
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h4>Sign-up</h4>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Name</strong></label>
                    <input type="text" placeholder='Enter name' name='name' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Age</strong></label>
                    <input type="number" placeholder='Enter age' name='age' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.age && <span className='text-danger'>{errors.age}</span>}
                    
                </div>
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Email</strong></label>
                    <input type="email" placeholder='Enter email' onChange={handleInput} name='email' className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                
                <div className='mb-3'>
                    <label className='d-flex justify-content-left align-items-left mb-2'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter password' name='password' onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Signup</strong></button>
                <p className='mt-3'>By signing up, You agree to our terms and conditions</p>
                <Link to='/login' className='btn btn-default border w-100 bg-light text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default SignupForm