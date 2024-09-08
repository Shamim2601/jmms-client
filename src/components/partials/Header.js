import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="bg-dark text-white py-3">
      <div className="container">
        <div className="text-center mb-3">
          <h1 className="mb-0">July-24 Martyrs Memorial Scholarship</h1>
        </div>
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-primary" onClick={() => handleNavigation('/')}>Home</button>
          <button className="btn btn-primary" onClick={() => handleNavigation('/martyrs')}>Martyrs</button>
          <button className="btn btn-primary" onClick={() => handleNavigation('/donors')}>Donors</button>
          <button className="btn btn-primary" onClick={() => handleNavigation('/students')}>Students</button>
          <button className="btn btn-primary" onClick={() => handleNavigation('/analytics')}>🔎</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
