import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import AddScholarship from './components/Home/AddScholarship';
import Martyrs from './components/Martyrs/Martyrs';
import Students from './components/Students/Students';
import Donors from './components/Donors/Donors';
import Analytics from './components/Analytics/Analytics';
import Footer from './components/partials/Footer';
import Header from './components/partials/Header';
import Disbursements from './components/Disbursements/Disbursements';

function App() {
  return (
    <Router>
      <div className='content'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/martyrs" element={<Martyrs />} />
          <Route path="/students" element={<Students />} />
          <Route path='/donors' element={<Donors />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/disbursements' element={<Disbursements />} />
          <Route path='/add-scholarship' element={<AddScholarship />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
