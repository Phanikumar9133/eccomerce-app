import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Help';
import About
import Services from './components/Services';
import ProductType from './components/ProductType';
import Help from './components/Help';
import Login from './components/Login';
import Register from './components/RegisterPage'; // Corrected
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Filter from './pages/Filter';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/ProductType" element={<ProductType />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerpage" element={<Register />} /> {/* Corrected path */}
          <Route path="/ProductDetails/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Filter" element={<Filter />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
