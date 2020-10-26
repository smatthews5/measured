import React from 'react';

import { Divider } from '@chakra-ui/core';

import Header from '../components/Header';
import Form from '../components/Form';

const SignUp: React.FC = () => {
  return (
    <>
      <div id="fixed">
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <Form />
      </div>
    </>
  );
};

export default SignUp;
