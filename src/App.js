import { Route, Routes} from 'react-router-dom';
import './components/Coverpage'
import Coverpage from './components/Coverpage';
import Loginform from './components/Login';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Coverpage/>}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/:state' element={<Loginform />}/>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/contact' element={<ContactUs />}/>

      </Routes>
    </div>
  );
}

export default App;
