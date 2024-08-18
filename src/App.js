import { Route, Routes } from 'react-router-dom';
import './components/Coverpage';
import Coverpage from './components/Coverpage';
import Loginform from './components/Login';
import Index from './components/Index';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Coverpage />} />
        <Route path="/index/*" element={<Index />} />
        <Route path="/:state" element={<Loginform />} />
      </Routes>
    </div>
  );
}

export default App;
