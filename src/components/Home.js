import React, { useState,useEffect } from 'react';
import logo from '../Assets/logo.png';
import './home.css';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
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
import indoorplants from '../Assets/indoorplants.jpg';
import flowerplants from '../Assets/flowerplants.jpg';
import fertilizers from '../Assets/fertilizers.jpg';
import seeds from '../Assets/seeds.jpg';
import vagetable from '../Assets/vagetable.jpg'
import plantc from '../Assets/plantc.jpg'
import seedc from '../Assets/seedc.jpeg'
import fertilizerc from '../Assets/fertilizerc.jpg'
import banana from '../Assets/banana.jpg'
import tomato from '../Assets/tomato.jpg'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Orderdes from './Orderdes';

const Home = () => {
    const [sidebar, setSidebar] = useState(false);
    const [searchItems, setItems] = useState('');
    const [selectitem,setselectitem]=useState({})

    const handleselect=(item)=>{
       setselectitem(item);
    }

    useEffect(() => {
        console.log(selectitem);
    }, [selectitem]);

    return (
        <div className={`layout ${!sidebar ? 'side-inac' : ''}`}>
            <Navbar sidebar={sidebar} setSidebar={setSidebar} />
            {Object.keys(selectitem).length !== 0 ?<Orderdes item={selectitem} setselectitem={setselectitem}/> : ''}
                <>
                    {sidebar && <Sidebar sidebar={sidebar} setSidebar={setSidebar} />}
                    <div className='contents'>
                        <div className='content-c'> {/*Put your content page within this container */}
                            {searchItems ? (
                                <>
                                    <Search searchItems={searchItems} setItems={setItems} />
                                    <Searchcontent searchItems={searchItems} handleselect={handleselect} />
                                </>
                            ) : (
                                <>
                                    <Search searchItems={searchItems} setItems={setItems} />
                                    <Imageslider />
                                    <Category />
                                </>
                            )}
                        </div>
                    </div>
                    <div className='footer'>
                        <Footer />
                    </div>
                </>
            
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
                    <NavLink to='/home' className='link-n'>Home</NavLink>
                    <NavLink to='/about' className='link-n'>About us</NavLink>
                    <NavLink to='/contact' className='link-n'>Contact us</NavLink>
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
    const toggleSidebar = () => {
        setSidebar(prevState => !prevState);
    };

    return (
        <div className={`sidebar1 ${sidebar ? 'hidden' : ''}`}>
            <div className='side1-header'>
                <span className='side1-h'>AgroMart</span>
                <MenuOpenIcon className='close1-i' fontSize='large' onClick={toggleSidebar} />
            </div>
            <div className='user-card'>
                <AccountCircleIcon sx={{ fontSize: '100px', color: '#084707',position:'relative'}} />
                <span className='edit-bg'>
                <EditIcon sx={{ fontSize: '18px' }} />
                </span>
                    <span>Hi, user</span>
                        
            </div>
            <div className='menu-items'>
                <div className='icon-card'>
                    <HomeIcon sx={{ fontSize: '30px' }} />
                    <span>Home</span>
                </div>
                <div className='icon-card'>
                    <InfoIcon sx={{ fontSize: '28px' }} />
                    <span>About us</span>
                </div>
                <div className='icon-card'>
                    <ShoppingCartIcon sx={{ fontSize: '30px' }} />
                    <span>Cart</span>
                </div>
                <div className='icon-card'>
                    <ListAltIcon sx={{ fontSize: '30px' }} />
                    <span>My orders</span>
                </div>
                <div className='icon-card'>
                    <AddCardIcon sx={{ fontSize: '30px' }} />
                    <span>Add card</span>
                </div>
                <div className='icon-card'>
                    <ContactPageIcon sx={{ fontSize: '30px' }} />
                    <span>Contact us</span>
                </div>
                <div className='icon-card'>
                    <LogoutIcon sx={{ fontSize: '30px' }} />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};


const Search = ({ searchItems, setItems}) => {
    const categories = [
        'Vegetable Plants',
        'Fruits',
        'Herbs',
        'Flowers',
        'Fertilizers',
        'Tools & Accessories'
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchQuery = event.target.search.value;
        console.log('Search query:', searchQuery);

    };

    const handleInputChange = (event) => {
        setItems(event.target.value);
    };

    return (
        <div className='searchbar'>
        <div className='searchbar-container'>
            <div className='browse-c'>
                <select>
                    <option value="">Browse categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <form className='search-c' onSubmit={handleSubmit}>
                <input
                    type="search"
                    name="search"
                    placeholder="Search..."
                    value={searchItems}
                    onChange={handleInputChange}
                    required
                />
            </form>
            </div>
        </div>
    );
};


const Imageslider = () => {
    const images=[indoorplants,vagetable,flowerplants,seeds,fertilizers]
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isforward,setforward]=useState(true)

    const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (isforward) {
                    if (prevIndex === images.length - 1) {
                        setforward(false);
                    }
                    else{prevIndex=prevIndex + 1;}
                } 
                else if (!isforward) { 
                    if (prevIndex === 0) {
                        setforward(true);
                    }
                    else{prevIndex=prevIndex - 1;}
                }

                return prevIndex;
            });
        }, 3000);
        return () => clearInterval(interval); 
      }, [isforward]);
    
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    return (
        <div className="slider-container">
          <button className="arrow1 left" onClick={prevSlide}>&#10094;</button>
          <div className="slider">
            <div
              className="slider-wrapper"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div className="slide" key={index}>
                  <img src={image} alt={`Slide ${index}`} />
                </div>
              ))}
            </div>
          </div>
          <button className="arrow1 right" onClick={nextSlide}>&#10095;</button>
        </div>
      );
    };


  const Category=()=>{
    return(
    <div className='catergory-container'>
        <div className='card-h'>Our Products</div>
        <div className='cardbox'>
        <div className='c-box'>
            <img src={plantc} />
            <span style={{fontSize:'24px'}}>Plants</span>
            <span style={{textAlign:'center'}}>We have diverse selection of vegetable plants, aromatic herbs, vibrant flowers, and easy-to-grow indoor plants, all perfect for any garden or home.</span>
        </div>
        <div className='c-box'>
            <img src={seedc} />
            <span style={{fontSize:'24px'}}>Seeds</span>
            <span style={{textAlign:'center'}}>“We offer a diverse selection of premium vegetable seeds, aromatic herb seeds, vibrant flower seeds, and high-quality fertilizers to enhance your garden’s growth and vitality.”</span>
        </div>
            <div className='c-box'>
            <img src={fertilizerc} />
            <span style={{fontSize:'24px'}}>Fertilizers</span>
            <span style={{textAlign:'center'}}>“Find top-quality fertilizers at Agro Mart, designed to boost growth and yield for your vegetable, herb, and flower gardens, ensuring vibrant and healthy plants.”</span>
            </div>
        </div>
    </div>
    )
  }

  const Searchcontent = ({ searchItems,handleselect }) => {
    const data = [
        {
            name: 'Cavendish Banana',
            image: banana,
            price: 500,
            stock: 50
        },
        {
            name: 'Plantain Banana',
            image: banana,
            price: 500,
            stock: 30
        },
        {
            name: 'Tomato plant',
            image: tomato,
            price: 250,
            stock: 20
        },
        {
            name: 'Plantain Banana',
            image: banana,
            price:500,
            stock: 10
        },
        {
            name: 'Cavendish Banana',
            image: banana,
            price: 500,
            stock: 15
        }
    ];
    
    
        const trimmedSearchItems = searchItems.trim().toLowerCase();
        const searchresult = data.filter((item) =>
        item.name.trim().toLowerCase().includes(trimmedSearchItems))
    
    
    return (
        <div className='search-p'>
            <span className='search-h'>
                Search results for "{searchItems}"
            </span>
            
            <div className='small-cards'>
            {searchItems === '' ? (
              <p style={{color:'green',fontSize:'24px', textAlign: 'center',
                marginTop: '25px',fontFamily:'Inter'}}>Please enter a name of an item</p>
                  ) : searchresult.length > 0 ? (
                   searchresult.map((item,index) => (
                 <div className='card' key={index} onClick={()=>handleselect(item)}>
                     <img src={item.image} alt={item.name} className='card-image' />
                    <div className='card-content'>
                       <h3 className='card-name'>{item.name}</h3>
                         <p style={{color:'green',fontWeight:'400'}}>Rs.{item.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{
            color: 'red',
            fontSize: '24px',
            textAlign: 'center',
            marginTop: '25px',
            fontFamily:'Inter'
          }}>
            Sorry, No items available
          </p>
      )}
            </div>
        </div>
    );
};


export default Home;