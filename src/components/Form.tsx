import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  Button,
} from '@chakra-ui/core';
import { signInWithGoogle } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';

const Form: React.FC = () => {
  return (
    <Flex justify="center" align="center" direction="column" margin="10px">
      <FormControl id="email" width="50%" isRequired>
        <FormLabel padding="2px" margin="2px">
          Email address
        </FormLabel>
        <Input type="email" />
        <FormLabel padding="2px" margin="2px">
          Password
        </FormLabel>
        <Input type="password" />
        <FormHelperText>We'll never share this data.</FormHelperText>
      </FormControl>

      <Flex width="100%" justify="center">
        <Button width="25%" margin="5px">
          Sign up
        </Button>
        <Button width="25%" margin="5px">
          Sign Out
        </Button>
      </Flex>
      <Button
        leftIcon={<FcGoogle />}
        width="25%"
        margin="5px"
        onClick={signInWithGoogle}
      >
        Sign up with google
      </Button>
    </Flex>
  );
};

export default Form;
