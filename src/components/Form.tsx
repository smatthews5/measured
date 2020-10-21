import React, { useState, useContext } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Button,
  Image,
  Heading,
  useToast,
  useDisclosure,
} from '@chakra-ui/core';
import FormModal from '../components/formModal';
import { UserContext } from '../Context';

import { signInWithGoogle } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth, createUserProfileDocument } from '../services/firebase';
import { navigate } from '@reach/router';

import loginBG from '../assets/images/loginBG.png';

const Form: React.FC = () => {
  const { user } = useContext(UserContext);

  const toast = useToast();
  const [displayName, setDisplayName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const showErrors = (errorMessage: string) => {
    const errors = toast({
      title: 'Error in form. Please try again!',
      description: errorMessage,
      duration: 9000,
      status: 'warning',
      isClosable: true,
    });
    return errors;
  };
  const newAccountMessage = (displayName: string | null) => {
    const message = toast({
      title: `Hey ${displayName}, welcome to Measured!`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    return message;
  };
  const successfullLogin = () => {
    const message = toast({
      title: 'Welcome back to Measured',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    return message;
  };

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        newEmail,
        newPassword,
      );
      if (user) createUserProfileDocument(user, { displayName });
      newAccountMessage(displayName);
      navigate('/');
      setDisplayName('');
      setNewEmail('');
      setNewPassword('');
    } catch (error) {
      const errors = error.message;
      showErrors(errors);
    }
  };
  const googleSignIn = async () => {
    signInWithGoogle().then(() => {
      onClose();
      setTimeout(() => successfullLogin(), 1000);
      setTimeout(() => navigate('/'), 1000);
    });
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      width="100%"
      height="100%"
      position="relative"
    >
      <Image
        src={loginBG}
        fit="cover"
        position="absolute"
        width="100%"
        height="100%"
        overflow="hidden"
      />
      <Flex
        justify="space-between"
        align="center"
        direction="column"
        width="80vw"
        minWidth="400px"
        overflowX="scroll"
        pb={2}
      >
        <Heading
          color="white"
          zIndex="0"
          textTransform="uppercase"
          mb={2}
          fontSize={['3xl', '4xl', '5xl', '6xl']}
        >
          Create a Measured account
        </Heading>
        <Flex direction="column" mb={3} zIndex="0">
          <Flex align="center" justify="center">
            <Text color="white">Already have an account?</Text>
            <Heading
              pl={2}
              pb={1}
              color="white"
              fontSize="2xl"
              zIndex="0"
              textTransform="uppercase"
              _hover={{ color: 'gray.300' }}
              onClick={onOpen}
            >
              Sign in &rarr;
            </Heading>
          </Flex>
        </Flex>

        <FormControl width="50%" py={3} isRequired>
          <FormLabel pt={1} color="white">
            Name
          </FormLabel>
          <Input
            mb={2}
            color="white"
            value={displayName}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              setDisplayName(value.target.value)
            }
          />
          <FormLabel pt={1} color="white">
            Email
          </FormLabel>
          <Input
            mb={2}
            type="email"
            color="white"
            value={newEmail}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              setNewEmail(value.target.value)
            }
          />
          <FormLabel pt={1} color="white">
            Password
          </FormLabel>
          <Input
            mb={2}
            type="password"
            color="white"
            value={newPassword}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword(value.target.value)
            }
          />
        </FormControl>
        <Button
          minWidth="300px"
          width="30%"
          height="55px"
          mt={6}
          onClick={onSubmit}
          color="purple.400"
          bgColor="white"
          _hover={{ bgColor: 'gray.200' }}
        >
          Sign up with <span id="title">Measured</span>
        </Button>
        <Button
          minWidth="300px"
          leftIcon={<FcGoogle />}
          width="30%"
          height="55px"
          mt={3}
          onClick={googleSignIn}
          bgColor="white"
          _hover={{ bgColor: 'gray.200' }}
        >
          Sign up with Google
        </Button>
        <FormModal onClose={onClose} isOpen={isOpen} user={user} />
      </Flex>
    </Flex>
  );
};

export default Form;
