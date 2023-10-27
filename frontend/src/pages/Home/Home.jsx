import React from 'react';
import hcmutImage from '../../../assets/images/hcmutlogo.jpg';

function Home() {
  return (
    <div>
      <h1>Đây là hình logo</h1>
      <img src={hcmutImage} alt="Logo" />
    </div>
  );
}

export default Home;