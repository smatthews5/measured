import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Text,
} from '@chakra-ui/core';
import { signInWithGoogle } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth, createUserProfileDocument } from '../services/firebase';
import { navigate } from '@reach/router';

const Form: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        newEmail,
        newPassword,
      );
      createUserProfileDocument(user, { displayName });
      navigate('/');
    
    } catch (error) {
      alert(error.message);
    }
    setDisplayName('');
    setNewEmail('');
    setNewPassword('');
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      margin="10px"
      width="100%"
      height="100%"
      marginTop="50px"
    >
      <Flex
        justify="center"
        align="center"
        direction="row"
        margin="10px"
        width="50vw"
        marginTop="50px"
        borderRadius="8px"
        boxShadow="0px 0px 10px 0.5px rgba(0,0,0,0.15)"
        height="60vh"
        minWidth='400px'

      >
        <Flex
          width="55%"
          direction="column"
          justify="center"
          align="center"
          padding="10px"
          margin="40px"
          minWidth='300px'
        >
          <Button
            minWidth='200px'
            leftIcon={<FcGoogle />}
            width="50%"
            margin="20px"
            onClick={signInWithGoogle}
            bgColor="white"
            _hover={{ bgColor: 'white' }}
            color="gray"
            border="0.5px solid lightGray"
            boxShadow="0px 0px 10px 0.5px rgba(0,0,0,0.15)"
            // import google button...
          >
            Sign up with Google
          </Button>
          <Text margin="20px">Or</Text>
          <FormControl width="100%" isRequired>
            <FormLabel>Display Name</FormLabel>
            <Input
              marginBottom="20px"
              placeholder="Display name"
              value={displayName}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setDisplayName(value.target.value)
              }
            />
            <FormLabel padding="2px" margin="2px">
              Email address
            </FormLabel>
            <Input
              marginBottom="20px"
              placeholder="Email"
              type="email"
              value={newEmail}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setNewEmail(value.target.value)
              }
            />
            <FormLabel padding="2px" margin="2px">
              Password
            </FormLabel>
            <Input
              placeholder="Password"
              type="password"
              value={newPassword}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(value.target.value)
              }
            />
          </FormControl>
          <Flex width="50%" margin="20px">
            <Button
              width="100%"
              marginRight="5px"
              marginTop="10px"
              onClick={onSubmit}
              color="white"
              bgColor="purple.400"
              _hover={{ bgColor: 'purple.400' }}
            >
              Sign up
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Form;
