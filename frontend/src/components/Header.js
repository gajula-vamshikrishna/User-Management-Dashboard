import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="flex justify-between items-center">
        <Link to="/" style={{ textDecoration: 'none' }}>
  <h1 className="text-2xl md:text-3xl font-bold italic font-serif text-black">
    User Management Dashboard
</h1>
</Link>

          <nav>
            <Link 
              to="/" 
              className={`btn ${location.pathname === '/' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/users/new" 
              className={`btn btn-success ${location.pathname === '/users/new' ? 'active' : ''}`}
              style={{ marginLeft: '8px' }}
            >
              Add User
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
