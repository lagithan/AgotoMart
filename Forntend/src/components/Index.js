// import React, { useState,useContext } from 'react';
// import { NavLink, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Order from './Order';
// import User from './User';
// import Addcard from './Addcard';
// import AddPaymentMethod from './AddPaymentMethod'; 
// import Saved from './Saved';
// import Update from './Update'
// import ContactUs from './ContactUs';
// import AboutUs from './AboutUs';
// import Cart from './Cart';
// import MenuOpenIcon from '@mui/icons-material/MenuOpen';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import AddCardIcon from '@mui/icons-material/AddCard';
// import EditIcon from '@mui/icons-material/Edit';
// import ContactPageIcon from '@mui/icons-material/ContactPage';
// import LogoutIcon from '@mui/icons-material/Logout';
// import Footer from './Footer';
// import logo from '../Assets/logo.png';
// import './home.css'
// import { UserContext } from './Userdata';

// const Index = () => {
//     const [sidebar, setSidebar] = useState(false);

//     return (
//         <div className={`layout ${!sidebar ? 'side-inac' : ''}`}>
//             <Navbar sidebar={sidebar} setSidebar={setSidebar} />
//             <>
//                 {sidebar && <Sidebar sidebar={sidebar} setSidebar={setSidebar} />}
//                 <div className='contents'>
//                     <div className='content-c'>
//                         <Routes>
//                             <Route index element={<Home />} />
//                             <Route path="aboutus" element={<AboutUs />} />
//                             <Route path="contactus" element={<ContactUs />} />
//                             <Route path="orders" element={<Order />} />
//                             <Route path="addcard" element={<Addcard />} />
//                             <Route path="add-payment-method" element={<AddPaymentMethod />} />
//                             <Route path="saved" element={<Saved />} />
//                             <Route path="user" element={<User />} />
//                             <Route path="cart" element={<Cart />} />
//                             <Route path="update" element={<Update />} />
//                         </Routes>
//                     </div>
//                 </div>
//             </>
//             <Footer />
//         </div>
//     );
// };

// const Navbar = ({ sidebar, setSidebar }) => {
//     const toggleSidebar = () => {
//         setSidebar(prevState => !prevState);
//     };

//     return (
//         <div className='navbar'>
//             <MenuIcon className='menu-i' fontSize='large' onClick={toggleSidebar} />
//             <img className='logo' src={logo} alt="Logo" />
//             <div className='head-t'>
//                 <span className='logo-1'>AgroMart</span>
//                 <span className='logo-2'>Grow your world with our plants</span>
//             </div>
//             <div className='link-c'>
//             <div className='nav-link'>
//     <NavLink
//         to='/index'
//         className={({ isActive }) => isActive ? 'link-n active' : 'link-n'}
//         end
//     >
//         Home
//     </NavLink>
//     <NavLink
//         to='/index/aboutus'
//         className={({ isActive }) => isActive ? 'link-n active' : 'link-n'}
//     >
//         About us
//     </NavLink>
//     <NavLink
//         to='/index/contactus'
//         className={({ isActive }) => isActive ? 'link-n active' : 'link-n'}
//     >
//         Contact us
//     </NavLink>
// </div>
//                 <div className='lg-c'>
//                     <NavLink to='/login' className='lg-i'>Login</NavLink>
//                     <NavLink to='/signup' className='lg-i'>Sign up</NavLink>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Sidebar = ({ sidebar, setSidebar }) => {

//     const{user_data,isregistered} =useContext(UserContext)
//     const toggleSidebar = () => {
//         setSidebar(prevState => !prevState);
//     };

//     return (
//         <div className={`sidebar1 ${!sidebar ? 'hidden' : ''}`}>
//             <div className='side1-header'>
//                 <span className='side1-h'>AgroMart</span>
//                 <MenuOpenIcon className='close1-i' fontSize='large' onClick={toggleSidebar} />
//             </div>
//             <div className='user-card'>
//                 <AccountCircleIcon sx={{ fontSize: '100px', color: '#084707', position: 'relative' }} />
//                 <span className='edit-bg'>
//                     <EditIcon sx={{ fontSize: '18px' }} />
//                 </span>
//                 <span>{
//                 `Hi, ${user_data.name}`}
//                  </span>
//             </div>
//             <div className='menu-items'>
//             <NavLink 
//                 to='/index' 
//                 className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
//                 style={{ textDecoration: 'none' }}
//                 end
//             >
//                 <HomeIcon sx={{ fontSize: '30px' }} />
//                 <span>Home</span>
//             </NavLink>

//             <NavLink 
//                 to='/index/aboutus' 
//                 className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
//                 style={{ textDecoration: 'none' }}
//             >
//                 <InfoIcon sx={{ fontSize: '28px' }} />
//                 <span>About us</span>
//             </NavLink>

//             <NavLink 
//                 to='/index/cart' 
//                 className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
//                 style={{ textDecoration: 'none' }}
//             >
//                 <ShoppingCartIcon sx={{ fontSize: '30px' }} />
//                 <span>Cart</span>
//             </NavLink>

//             <NavLink 
//                 to='/index/orders' 
//                 className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
//                 style={{ textDecoration: 'none' }}
//             >
//                 <ListAltIcon sx={{ fontSize: '30px' }} />
//                 <span>My orders</span>
//             </NavLink>

//             <NavLink 
//                 to='/index/saved' 
//                 className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
//                 style={{ textDecoration: 'none' }}
//             >
//                 <AddCardIcon sx={{ fontSize: '30px' }} />
//                 <span>Add card</span>
//             </NavLink>

//             <NavLink 
//                 to='/index/contactus' 
//                 className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
//                 style={{ textDecoration: 'none' }}
//             >
//                 <ContactPageIcon sx={{ fontSize: '30px' }} />
//                 <span>Contact us</span>
//             </NavLink>

//             <NavLink 
//                 to='/' 
//                 className='icon-card' 
//                 style={{ textDecoration: 'none' }}
//             >
//                 <LogoutIcon sx={{ fontSize: '30px' }} />
//                 <span>Logout</span>
//             </NavLink>
//             </div>
//         </div>
//     );
// };

// export default Index;


import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Order from './Order';
import User from './User';
import Addcard from './Addcard';
import AddPaymentMethod from './AddPaymentMethod';
import Saved from './Saved';
import Update from './Update';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Cart from './Cart';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LogoutIcon from '@mui/icons-material/Logout';
import Footer from './Footer';
import logo from '../Assets/logo.png';
import './home.css';
import { UserContext } from './Userdata';

const Index = () => {
    const [sidebar, setSidebar] = useState(false);

    return (
        <div className={`layout ${!sidebar ? 'side-inac' : ''}`}>
            <Navbar sidebar={sidebar} setSidebar={setSidebar} />
            <>
                {sidebar && <Sidebar sidebar={sidebar} setSidebar={setSidebar} />}
                <div className='contents'>
                    <div className='content-c'>
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="aboutus" element={<AboutUs />} />
                            <Route path="contactus" element={<ContactUs />} />
                            <Route path="orders" element={<Order />} />
                            <Route path="addcard" element={<Addcard />} />
                            <Route path="add-payment-method" element={<AddPaymentMethod />} />
                            <Route path="saved" element={<Saved />} />
                            <Route path="user" element={<User />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="update/:id" element={<Update />} />
                        </Routes>
                    </div>
                </div>
            </>
            <Footer />
        </div>
    );
};

const Navbar = ({ sidebar, setSidebar }) => {
    const toggleSidebar = () => {
        setSidebar(prevState => !prevState);
    };

    return (
        <div className='navbar'>
            <MenuIcon className='menu-i' fontSize='large' onClick={toggleSidebar} />
            <img className='logo' src={logo} alt="Logo" />
            <div className='head-t'>
                <span className='logo-1'>AgroMart</span>
                <span className='logo-2'>Grow your world with our plants</span>
            </div>
            <div className='link-c'>
                <div className='nav-link'>
                    <NavLink
                        to='/index'
                        className={({ isActive }) => isActive ? 'link-n active' : 'link-n'}
                        end
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/index/aboutus'
                        className={({ isActive }) => isActive ? 'link-n active' : 'link-n'}
                    >
                        About us
                    </NavLink>
                    <NavLink
                        to='/index/contactus'
                        className={({ isActive }) => isActive ? 'link-n active' : 'link-n'}
                    >
                        Contact us
                    </NavLink>
                </div>
                <div className='lg-c'>
                    <NavLink to='/login' className='lg-i'>Login</NavLink>
                    <NavLink to='/signup' className='lg-i'>Sign up</NavLink>
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user_data, isregistered } = useContext(UserContext);
    const [paymentMethods, setPaymentMethods] = useState([]);

    const toggleSidebar = () => {
        setSidebar(prevState => !prevState);
    };

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/payment/get/${user_data.id}`);
                setPaymentMethods(response.data);
            } catch (error) {
                console.error('Error fetching payment methods:', error);
            }
        };

        fetchPaymentMethods();
    }, [user_data.id]);

    return (
        <div className={`sidebar1 ${!sidebar ? 'hidden' : ''}`}>
            <div className='side1-header'>
                <span className='side1-h'>AgroMart</span>
                <MenuOpenIcon className='close1-i' fontSize='large' onClick={toggleSidebar} />
            </div>
            <div className='user-card'>
                <AccountCircleIcon sx={{ fontSize: '100px', color: '#084707', position: 'relative' }} />
                <span className='edit-bg'>
                    <EditIcon sx={{ fontSize: '18px' }} />
                </span>
                <span>{`Hi, ${user_data.name}`}</span>
            </div>
            <div className='menu-items'>
                <NavLink 
                    to='/index' 
                    className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
                    style={{ textDecoration: 'none' }}
                    end
                >
                    <HomeIcon sx={{ fontSize: '30px' }} />
                    <span>Home</span>
                </NavLink>

                <NavLink 
                    to='/index/aboutus' 
                    className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
                    style={{ textDecoration: 'none' }}
                >
                    <InfoIcon sx={{ fontSize: '28px' }} />
                    <span>About us</span>
                </NavLink>

                <NavLink 
                    to='/index/cart' 
                    className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
                    style={{ textDecoration: 'none' }}
                >
                    <ShoppingCartIcon sx={{ fontSize: '30px' }} />
                    <span>Cart</span>
                </NavLink>

                <NavLink 
                    to='/index/orders' 
                    className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
                    style={{ textDecoration: 'none' }}
                >
                    <ListAltIcon sx={{ fontSize: '30px' }} />
                    <span>My orders</span>
                </NavLink>

                {paymentMethods.length === 0 ? (
                    <NavLink 
                        to='/index/addcard' 
                        className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
                        style={{ textDecoration: 'none' }}
                    >
                        <AddCardIcon sx={{ fontSize: '30px' }} />
                        <span>Add card</span>
                    </NavLink>
                ) : (
                    <NavLink 
                        to='/index/saved' 
                        className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
                        style={{ textDecoration: 'none' }}
                    >
                        <AddCardIcon sx={{ fontSize: '30px' }} />
                        <span>Saved cards</span>
                    </NavLink>
                )}

                <NavLink 
                    to='/index/contactus' 
                    className={({ isActive }) => isActive ? 'icon-card active' : 'icon-card'}
                    style={{ textDecoration: 'none' }}
                >
                    <ContactPageIcon sx={{ fontSize: '30px' }} />
                    <span>Contact us</span>
                </NavLink>

                <NavLink 
                    to='/' 
                    className='icon-card' 
                    style={{ textDecoration: 'none' }}
                >
                    <LogoutIcon sx={{ fontSize: '30px' }} />
                    <span>Logout</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Index;