import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import '../../../styles.css';

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
