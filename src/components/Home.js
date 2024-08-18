import React, { useState, useEffect } from 'react';
import './home.css';
import indoorplants from '../Assets/indoorplants.jpg';
import flowerplants from '../Assets/flowerplants.jpg';
import fertilizers from '../Assets/fertilizers.jpg';
import seeds from '../Assets/seeds.jpg';
import vagetable from '../Assets/vagetable.jpg';
import plantc from '../Assets/plantc.jpg';
import seedc from '../Assets/seedc.jpeg';
import fertilizerc from '../Assets/fertilizerc.jpg';
import banana from '../Assets/banana.jpg';
import tomato from '../Assets/tomato.jpg';
import Orderdes from './Orderdes';

const Home = () => {
    const [searchItems, setItems] = useState('');
    const [selectitem, setselectitem] = useState({});

    const handleSelect = (item) => {
        setselectitem(item);
    };

    useEffect(() => {
        console.log(selectitem);
    }, [selectitem]);

    return (
        <>
            {Object.keys(selectitem).length !== 0 ? (
                <Orderdes item={selectitem} setselectitem={setselectitem} />
            ) : ''}
            <Search searchItems={searchItems} setItems={setItems} />
            {searchItems ? (
                <Searchcontent searchItems={searchItems} handleSelect={handleSelect} />
            ) : (
                <>
                    <Imageslider />
                    <Category />  
                </>
            )}
        </>
    );
};    

const Search = ({ searchItems, setItems }) => {
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
    const images = [indoorplants, vagetable, flowerplants, seeds, fertilizers];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isforward, setforward] = useState(true);

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
                    } else {
                        prevIndex = prevIndex + 1;
                    }
                } else {
                    if (prevIndex === 0) {
                        setforward(true);
                    } else {
                        prevIndex = prevIndex - 1;
                    }
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

const Searchcontent = ({ searchItems, handleSelect }) => {
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
            price: 500,
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
        item.name.trim().toLowerCase().includes(trimmedSearchItems)
    );

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
                    searchresult.map((item, index) => (
                        <div className='card' key={index} onClick={() => handleSelect(item)}>
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

const Category = () => {
    return (
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
                    <span style={{textAlign:'center'}}>We offer a diverse selection of premium vegetable seeds, aromatic herb seeds, vibrant flower seeds, and high-quality fertilizers to enhance your garden’s growth and vitality.</span>
                </div>
                <div className='c-box'>
                    <img src={fertilizerc} />
                    <span style={{fontSize:'24px'}}>Fertilizers</span>
                    <span style={{textAlign:'center'}}>Find top-quality fertilizers at Agro Mart, designed to boost growth and yield for your vegetable, herb, and flower gardens, ensuring vibrant and healthy plants.</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
