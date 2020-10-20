import React from 'react';

import { Divider } from '@chakra-ui/core';

import Header from '../components/Header';
import Form from '../components/Form';
import About from '../components/About';

const LoginSignup: React.FC = () => {
  return (
    <>
      <div id="fixed">
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <Form />
        <About />
      </div>
    </>
  );
};

export default LoginSignup;
