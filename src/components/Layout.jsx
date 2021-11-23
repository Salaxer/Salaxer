import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="all">
      <Header/>
      {children}
    </div>
  );
};

export default Layout;