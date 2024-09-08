import React from 'react';
import axios from 'axios';
import { NavLink,useNavigate} from 'react-router-dom';
import './login.css'; 
import { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom'
import Signup from './Signup';
import { UserContext } from './Userdata';

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
      <i className="fa-solid fa-arrow-left arrow"/>
        </NavLink>
      {form ? <Login setform={setform} form={form}/> : <Signup setform={setform}  form={form}/>}
      </div>
      </div>
  );
}

const Login = ({setform,form}) => {
  
  const navigate=useNavigate();
  const { setuserdata, setregister, user_data } = useContext(UserContext);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [valid,setvalid] =useState("");
  const [animate,setanimate]=useState(false)
  const [serror, setserror] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(values)
      const response = await axios.post('http://localhost:5000/user/login', values);
      console.log("Login Response:", response.data);
      const { userdata } = response.data;
    
      // Update user data
      const updateUserState = async () => {

        await setregister(true);
        await setuserdata({
          id: userdata.id,
          name: userdata.name,
          email: userdata.email,
          role: userdata.role,
          phonenumber:userdata.phonenumber
        });
      };


      setserror('');

      setValues({
        email: '',
        password: '',
      });
      
      updateUserState();
      userdata.role === "user" ? navigate('/index') : navigate('/admin')

    } catch (err) {
      console.error("Login error:", err.response?.data?.message || 'An error occurred'); 
      setserror(err.response?.data?.message || 'An error occurred');
    }}
    
  return (
    <form onSubmit={handleSubmit}>
    <div className='login-container'>
      <div className='left-t'>
        <span style={{fontSize:'32px',fontWeight:'bold',color:'white',textAlign:'center'}}>Welcome back to AgroMart</span>
        <span className='head1'>Login</span>
        <div className='form-container1'>
        <div className='form-i'>
          <input type='email' name='email' required value={values.email} onChange={handleChange} placeholder='Enter your email'/>
          {errors.email && <div className={`error ${animate ? 'fade-in' : ''}`}>{errors.email}</div>}
        </div>
        <div className='form-i'>
          <input type='password' name='password' required value={values.password} onChange={handleChange} placeholder='Enter your password'/>
          {errors.password && <div className={`error ${animate ? 'fade-in' : ''}`}>{errors.name}</div>
        }
        </div>
        {serror && <div style={{ color: 'red', fontSize: '18px',position:"relative",left:'100px'}}>{serror}</div>}
          <button  type='submit' className='submit-btn2' >Login</button>
          <span style={{margin:'0px',color:'white'}} className='login-f' >Don't you have an account? 
            <NavLink style={{margin:'5px'}} onClick={hanlestate}>Sign up</NavLink>
          </span>
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
