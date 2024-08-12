import React from 'react';
import { NavLink } from 'react-router-dom';
import './login.css'; 
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom'
import Signup from './Signup';

const Loginform = () => {
  const {state} = useParams();
  const [form,setform] = useState(true);

  useEffect(() => {
    if (state === 'login') {
        setform(true);
    } else if (state ==='signup'){
        setform(false);
    }
}, [state]);

  return (
    <div className='body1'>
    <div className='login-container'>
      <NavLink to="/">
      <i class="fa-solid fa-arrow-left arrow"/>
        </NavLink>
      {form ? <Login setform={setform} form={form}/> : <Signup setform={setform}  form={form}/>}
      </div>
      </div>
  );
}

const Login = ({setform,form}) => {

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [valid,setvalid] =useState("");
  const [animate,setanimate]=useState(false)

  const hanlestate = ()=>{
    form ? setform(false) : setform(true);
  }

  useEffect(() => {
    setanimate(true);
    console.log("hello");
  });

  const validate = (name, value) => {
    
    const newError = {}; 
  
    if (name === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        newError.email = 'Email required';
      } else if (!regex.test(value)) {
        newError.email = 'Enter the correct email';
      } else {
        newError.email = '';
      }
    }
  
  
    setErrors({ ...errors, [name]: newError[name] });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    validate(name, value);
    setValues({ ...values, [name]: value }); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const allValuesProvided = Object.values(values).every(value => value.trim() !== '');
    const noErrors = Object.values(errors).every(error => !error);}
  
  

  return (
    <form>
    <div className='login-container'>
      <div className='left-t'>
        <span style={{fontSize:'32px',fontWeight:'bold',color:'white',textAlign:'center'}}>Welcome back to AgroMart</span>
        <span className='head1'>Login</span>
        <div className='form-container'>
        <div className='form-i'>
          <input type='email' name='email' required value={values.email} onChange={handleChange} placeholder='Enter your email'/>
          {errors.email && <div className={`error ${animate ? 'fade-in' : ''}`}>{errors.email}</div>}
        </div>
        <div className='form-i'>
          <input type='password' name='password' required value={values.password} onChange={handleChange} placeholder='Enter your password'/>
          {errors.password && <div className={`error ${animate ? 'fade-in' : ''}`}>{errors.name}</div>
        }
        </div>
          <div className='footer'>
          <button className='submit-btn' >Login</button>
          <span style={{margin:'0px',color:'white'}}>Don't you have an account? 
            <NavLink style={{margin:'5px'}} onClick={hanlestate}>Sign up</NavLink>
          </span>
          </div>
        </div>
      </div>
      <div className='image-container1'>
        <div className='right-t'>
          <span className='hero-txt'>Don't you have an account ?</span>
          <button className='create-btn' onClick={hanlestate}>Create an account</button>
        </div>
      </div>
    </div>
    </form>
  );
}

export default Loginform;
