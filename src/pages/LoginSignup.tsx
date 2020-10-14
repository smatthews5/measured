import React from 'react';

import Header from '../components/Header';
import Form from '../components/Form';
import About from '../components/About';

const LoginSignup: React.FC = () => {
  return (
    <>
      <Header />
      <>
        <Form />
        <About />
      </>
    </>
  );
};

export default LoginSignup;
