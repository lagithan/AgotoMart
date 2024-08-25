import React, { useEffect, useState, useContext } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import './login.css';
import { UserContext } from './Userdata';
import axios from 'axios';

const Signup = ({ setform, form }) => {
  const navigate =useNavigate();
  const { setuserdata, setregister, user_data } = useContext(UserContext);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmpaswd: ''
  });

  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmpaswd: '' });
  const [animate, setAnimate] = useState(false);
  const [serror, setserror] = useState('');

  useEffect(() => {
    setAnimate(true);
    console.log("Component mounted");
  }, []);

  const hanlestate = () => {
    setform(!form);
  }

  const validate = (name, value) => {
    const newError = {};

    if (name === 'name') {
      const regex = /^[a-zA-Z\s]*$/;
      if (!value) {
        newError.name = 'Name required';
      } else if (!regex.test(value)) {
        newError.name = 'Enter the correct name';
      } else if (value.length > 20) {
        newError.name = 'Length must be less than 20';
      } else {
        newError.name = '';
      }
    }

    if (name === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        newError.email = 'Email required';
      } else if (!regex.test(value)) {
        newError.email = 'Enter a valid email';
      } else {
        newError.email = '';
      }
    }

    if (name === 'password') {
      if (!value) {
        newError.password = 'Password required';
      } else if (value.length < 6) {
        newError.password = 'Password must be at least 6 characters';
      } else {
        newError.password = '';
      }
    }

    if (name === 'confirmpaswd') {
      if (!value) {
        newError.confirmpaswd = 'Confirm your password';
      } else if (value !== values.password) {
        newError.confirmpaswd = "Password doesn't match";
      } else {
        newError.confirmpaswd = '';
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
    const allValuesProvided = Object.values(values).every(value => value.trim() !== '');
    const noErrors = Object.values(errors).every(error => !error);

    if (allValuesProvided && noErrors) {
      try {
        const { confirmpaswd, ...formdata } = values;
        const response = await axios.post('http://localhost:5000/user/signup', formdata);
        console.log("Signup Response:", response.data);

        const { userdata, message } = response.data;

       
      // Update user data
      const updateUserState = async () => {
        await setregister(true);
        await setuserdata({
          id: userdata.id,
          name: userdata.name,
          email: userdata.email,
          role: userdata.role,
        });
      };

      updateUserState();


        setserror('');

        setValues({
          name: '',
          email: '',
          password: '',
          confirmpaswd: ''
        });

        console.log('Registered User:', user_data);
        console.log('Message:', message);
        navigate('/index');

      } catch (err) {
        console.error("Signup Error:", err); 
        setserror(err.response?.data?.error || 'An error occurred');
      }
    } else {
      console.log("Please fix the errors");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='login-container'>
        <div className='left-t'>
          <span className='head1'>Sign up</span>
          <div className='form-container1'>
            <div className='form-i'>
              <input
                type='text'
                name='name'
                required
                value={values.name}
                onChange={handleChange}
                placeholder='Enter your name'
              />
              {errors.name && <div className={`error ${animate ? 'fade-in' : ''}`}>{errors.name}</div>}
            </div>
            <div className='form-i'>
              <input
                type='email'
                name='email'
                required
                value={values.email}
                onChange={handleChange}
                placeholder='Enter your email'
              />
              {errors.email && <div className={`error ${animate ? 'fade-in' : ''}`}>{errors.email}</div>}
            </div>
            <div className='form-i'>
              <input
                type='password'
                name='password'
                required
                value={values.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />
              {errors.password && <div className={`error ${animate ? 'fade-in' : ''}`}>{errors.password}</div>}
            </div>
            <div className='form-i'>
              <input
                type='password'
                name='confirmpaswd'
                required
                value={values.confirmpaswd}
                onChange={handleChange}
                placeholder='Confirm your password'
              />
              {errors.confirmpaswd && <div className={`error ${animate ? 'fade-in' : ''}`}>{errors.confirmpaswd}</div>}
            </div>
              <button type='submit' className='submit-btn'>Sign up</button>
              {serror && <span style={{ color: 'red', fontSize: '15px',position:"absolute",bottom:'0px',left:'50px'}}>{serror}</span>}
              <span style={{ color: 'white' }} className='login-f'>
                  Already have an account?
                  <NavLink style={{ marginLeft: '5px' }} onClick={hanlestate}>Login</NavLink>
                 </span>

          </div>
        </div>
        <div className='image-container1'>
          <div className='right-t'>
            <span className='hero-txt'>Already have an account?</span>
            <button className='create-btn' onClick={hanlestate}>Login to your account</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
