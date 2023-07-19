import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="all">
      <Header/>
      <div className="viewAll">
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;