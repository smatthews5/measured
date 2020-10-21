import React, { useState, useContext } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
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
        height="60vh"
        minWidth="400px"
      >
        <Image
          src={loginBG}
          fit="cover"
          position="absolute"
          width="50vw"
          height="66vh"
          marginTop="50px"
          borderRadius="8px"
          minWidth="400px"
          boxShadow="0px 0px 10px 0.5px rgba(0,0,0,0.5)"
        ></Image>
        <Flex
          width="55%"
          direction="column"
          justify="center"
          align="center"
          padding="10px"
          margin="40px"
          minWidth="300px"
        >
          <Heading
            alignSelf="center"
            color="white"
            zIndex="0"
            textTransform="uppercase"
            marginTop="50px"
          >
            Create a Measured account
          </Heading>

          <Button
            minWidth="200px"
            leftIcon={<FcGoogle />}
            width="50%"
            marginTop="40px"
            onClick={googleSignIn}
            bgColor="white"
            _hover={{ bgColor: 'white' }}
            color="gray"
            border="0.5px solid lightGray"
            boxShadow="0px 0px 10px 0.5px rgba(0,0,0,0.15)"
          >
            Sign up with Google
          </Button>
          <Heading
            mt={2}
            color="white"
            fontSize="2xl"
            zIndex="0"
            textTransform="uppercase"
          >
            or
          </Heading>
          <FormControl width="100%" isRequired>
            <FormLabel color="white">Display Name</FormLabel>
            <Input
              marginBottom="20px"
              placeholder="Display name"
              color="white"
              value={displayName}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setDisplayName(value.target.value)
              }
            />
            <FormLabel padding="2px" margin="2px" color="white">
              Email address
            </FormLabel>
            <Input
              marginBottom="20px"
              placeholder="Email"
              type="email"
              color="white"
              value={newEmail}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setNewEmail(value.target.value)
              }
            />
            <FormLabel padding="2px" margin="2px" color="white">
              Password
            </FormLabel>
            <Input
              placeholder="Password"
              type="password"
              color="white"
              value={newPassword}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(value.target.value)
              }
            />
          </FormControl>
          <Flex width="100%" margin="20px">
            <Button
              width="50%"
              marginRight="5px"
              marginTop="10px"
              onClick={onSubmit}
              color="white"
              bgColor="purple.400"
              _hover={{ bgColor: 'purple.400' }}
            >
              Sign up
            </Button>
            <Button
              width="50%"
              marginRight="5px"
              marginTop="10px"
              onClick={onOpen}
              color="white"
              bgColor="purple.400"
              _hover={{ bgColor: 'purple.400' }}
            >
              Sign in
            </Button>
          </Flex>
          <FormModal onClose={onClose} isOpen={isOpen} user={user} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Form;
