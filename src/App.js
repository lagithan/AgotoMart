import { Route, Routes} from 'react-router-dom';
import './components/Coverpage'
import Coverpage from './components/Coverpage';
import Loginform from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Coverpage/>}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/:state' element={<Loginform />}/>
      </Routes>
    </div>
  );
}

export default App;
