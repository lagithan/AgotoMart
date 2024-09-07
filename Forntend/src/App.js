import { Route, Routes } from 'react-router-dom';
import './components/Coverpage';
import Coverpage from './components/Coverpage';
import Loginform from './components/Login';
import Index from './components/Index';
import Admin from './admin_components/admin';
import { UserProvider } from './components/Userdata';
import OrderForm from './components/OrderForm';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import CartOrder from './components/Cartorder';


function App() {
  return (
    <UserProvider> 
    <div className="App">
      <Routes>
        <Route path="/" element={<Coverpage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path="/index/orderform" element={<OrderForm/>} />
        <Route path="/index/*" element={<Index />} />
        <Route path="/:state" element={<Loginform />} />
        <Route path="/cartorder" element={<CartOrder />} />
      </Routes>
    </div>
    </UserProvider>
    
  );
}

export default App;
