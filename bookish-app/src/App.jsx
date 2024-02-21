import './App.css';
import First from './pages/First';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import BrowserRouter
import Register from './pages/Register';
import Home from './pages/Home';
import Tracking from './pages/Tracking';
import Library from './pages/Library';
import Quotes from './pages/Quotes';

function App() {
  return (
    <Router>
      <div className="App">
      
      <Routes>
      <Route path='/' element={<First/>} />
      <Route path='/register' element={<Register />} />
      <Route path='/home/:userId' element={<Home />} />
      <Route path='/tracking/:userId' element={<Tracking />} />
      <Route path='/library/:userId' element={<Library />} />
      <Route path='/quotes/:userId' element={<Quotes />} />


        </Routes>
    </div>
    </Router>
  );
}

export default App;
