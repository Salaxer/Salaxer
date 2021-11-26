import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="all">
      <Header/>
      <div className="viewAll">
        {children}
      </div>
    </div>
  );
};

export default Layout;