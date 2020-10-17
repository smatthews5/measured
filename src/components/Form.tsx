import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  Button,
  Text,
} from '@chakra-ui/core';
import { signInWithGoogle, signOutFromGoogle } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth, createUserProfileDocument } from '../services/firebase';

const Form: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    try {
      const { user } = auth.createUserWithEmailAndPassword(email, password);
      createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.error(error);
    }
    setDisplayName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Flex justify="center" align="center" direction="column" margin="10px">
      <FormLabel padding="2px" margin="2px" width="50%">
        Diaply Name
      </FormLabel>
      <Input
        type="display name"
        width="50%"
        value={displayName}
        onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
          setDisplayName(value.target.value)
        }
      />
      <FormControl width="50%" isRequired>
        <FormLabel padding="2px" margin="2px">
          Email address
        </FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(value.target.value)
          }
        />
        <FormLabel padding="2px" margin="2px">
          Password
        </FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(value.target.value)
          }
        />
        <FormHelperText>We'll never share this data.</FormHelperText>
      </FormControl>

      <Flex width="100%" justify="center">
        <Button width="25%" margin="5px" onClick={onSubmit}>
          Sign up
        </Button>
        <Button width="25%" margin="5px">
          Sign Out
        </Button>
      </Flex>
      <Flex width="100%" justify="center">
        <Button
          isTruncated
          leftIcon={<FcGoogle />}
          width="25%"
          margin="5px"
          onClick={signInWithGoogle}
        >
          Sign in{' '}
          <Text fontSize={['0px', '0px', '16px', '16px']}>with google</Text>
        </Button>
        <Button
          isTruncated
          leftIcon={<FcGoogle />}
          width="25%"
          margin="5px"
          onClick={signOutFromGoogle}
        >
          Sign out with google
        </Button>
      </Flex>
    </Flex>
  );
};

export default Form;
