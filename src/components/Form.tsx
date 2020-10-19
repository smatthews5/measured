import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Flex, Button, Text } from '@chakra-ui/core';
import { signInWithGoogle } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth, createUserProfileDocument } from '../services/firebase';

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
      // setTimeout message to say success
      //redirect home..
    } catch (error) {
      console.error('form error', error);
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
      marginTop="50px"
    >
      <Flex width="35%" direction="column" justify="center" align="center">
        <Button
          isTruncated
          leftIcon={<FcGoogle />}
          width="50%"
          margin="20px"
          onClick={signInWithGoogle}
        >
          Sign up with Google
        </Button>
          <Text margin="20px">Or</Text>
        <FormControl isRequired>
          <FormLabel>Display Name</FormLabel>
          <Input
            placeholder="Display name"
            value={displayName}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              setDisplayName(value.target.value)
            }
          />
        </FormControl>
        <FormControl width="100%" isRequired>
          <FormLabel padding="2px" margin="2px">
            Email address
          </FormLabel>
          <Input
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
        <Flex width="100%">
          <Button
            width="50%"
            marginRight="5px"
            marginTop="10px"
            onClick={onSubmit}
          >
            Sign up
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Form;
