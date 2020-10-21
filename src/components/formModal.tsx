import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';

import { signInWithGoogle, signOut } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../services/firebase';
import { User } from '../interfaces';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Button,
  Text,
  Image,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  useToast,
} from '@chakra-ui/core';

import icon from '../assets/images/header_icon.png';
import loading from '../assets/images/loading.png';
import loginBG from '../assets/images/loginBG.png';

interface HeaderProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
};

const Header: React.FC<HeaderProps> = ({isOpen, onClose, user}) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formPage = location.pathname === '/welcome';

  const successfulLogin = () => {
    const message = toast({
      title: 'Welcome back to Measured',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    return message;
  };

  const successfulLogout = () => {
    const message = toast({
      title: 'Until next time! Thanks for using Measured',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    return message;
  };

  const googleSignIn = async () => {
    signInWithGoogle().then(() => {
      onClose();
      setTimeout(() => successfulLogin(), 1000);
      setTimeout(() => navigate('/'), 1000);
    });
  };

  const showErrors = (errorMessage: string) => {
    const errors = toast({
      title: 'Error in form. Please try again..',
      description: errorMessage,
      duration: 9000,
      status: 'warning',
      isClosable: true,
    });
    return errors;
  };

  const emailSignIn = async () => {
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          onClose();
          setTimeout(() => successfulLogin(), 1000);
          setTimeout(() => navigate('/'), 1000);
          setTimeout(() => {
            setEmail('');
            setPassword('');
          }, 1000);
        })
        .catch((error) => {
          const errors = error.message;
          if (errors) {
            showErrors(errors);
          }
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error in modal signup', error);
    }
  };

  const signUserOut = () => {
    signOut().then(() => {
      onClose();
      navigate('/');
      setTimeout(() => successfulLogout(), 1000);
    });
  };

  return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay>
            {user ? (
              <ModalContent borderRadius="16px" position="relative">
                <Image
                  src={loginBG}
                  objectFit="cover"
                  position="absolute"
                  top="0px"
                  left="0px"
                  width="100%"
                  height="100%"
                  borderRadius="16px"
                ></Image>
                <Heading
                  alignSelf="center"
                  color="white"
                  zIndex="0"
                  marginTop="10px"
                >
                  Ready to go?
                </Heading>
                <ModalCloseButton color="white" />
                <ModalBody pb={6}>
                  <Flex align="center" justify="center" direction="column">
                    <Flex
                      height="30vh"
                      align="center"
                      justify="space-between"
                      direction="column"
                    >
                      <Text color="white" zIndex="0" fontSize="20px">
                        {user.displayName}
                      </Text>
                      <Text color="white" zIndex="0" fontSize="20px">
                        {user.email.toLowerCase()}
                      </Text>
                      <Heading
                        mt={2}
                        color="white"
                        fontSize="2xl"
                        zIndex="0"
                        textAlign="center"
                      >
                        Thanks for visiting Measured.
                      </Heading>
                      <Image
                        zIndex="0"
                        w="110px"
                        h="110px"
                        objectFit="cover"
                        fallbackSrc={loading}
                        src={icon}
                        alt="Login/signup icon"
                        mb={2}
                      />
                      <Heading
                        my={2}
                        color="white"
                        fontSize="2xl"
                        zIndex="0"
                        textAlign="center"
                      >
                        Happy stirring.
                      </Heading>
                    </Flex>
                    <Button
                      my={4}
                      width="100%"
                      onClick={() => navigate('/my-bar')}
                      color="purple.400"
                      height="55px"
                      _hover={{ bgColor: 'gray.300' }}
                    >
                      &larr; Back to my bar
                    </Button>
                    <Button
                      my={4}
                      width="100%"
                      onClick={signUserOut}
                      color="purple.400"
                      height="55px"
                      _hover={{ bgColor: 'gray.300' }}
                    >
                      Sign out &rarr;
                    </Button>
                  </Flex>
                </ModalBody>
              </ModalContent>
            ) : (
              <ModalContent borderRadius="16px" position="relative">
                <Image
                  src={loginBG}
                  fallbackSrc={loading}
                  objectFit="cover"
                  position="absolute"
                  top="0px"
                  left="0px"
                  width="100%"
                  height="100%"
                  borderRadius="16px"
                ></Image>
                <ModalHeader
                  alignSelf="center"
                  color="white"
                  zIndex="0"
                  bgColor="purple.400"
                >
                  <Heading textTransform="uppercase">Login to Measured</Heading>
                </ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody pb={6}>
                  <Flex align="center" justify="center" direction="column">
                    <Button
                      isTruncated
                      leftIcon={<FcGoogle />}
                      width="100%"
                      marginLeft="5px"
                      marginTop="10px"
                      onClick={googleSignIn}
                      boxShadow="0px 0px 10px 0.5px rgba(0,0,0,0.15)"
                      height="55px"
                    >
                      Log in with Google
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
                    <FormControl mt={1} isRequired>
                      <FormLabel padding="2px" margin="2px" color="white">
                        Email
                      </FormLabel>
                      <Input
                        type="email"
                        value={email}
                        color="white"
                        onChange={(
                          value: React.ChangeEvent<HTMLInputElement>,
                        ) => setEmail(value.target.value)}
                      />
                    </FormControl>
                    <FormControl my={2} isRequired>
                      <FormLabel padding="2px" margin="2px" color="white">
                        Password
                      </FormLabel>
                      <Input
                        type="password"
                        color="white"
                        value={password}
                        onChange={(
                          value: React.ChangeEvent<HTMLInputElement>,
                        ) => setPassword(value.target.value)}
                      />
                    </FormControl>
                    <Button
                      mt={3}
                      height="55px"
                      onClick={emailSignIn}
                      color="purple.400"
                      bgColor="white"
                      _hover={{ bgColor: 'gray.300' }}
                      width="100%"
                    >
                      Login with a <span id="title">Measured</span> account
                    </Button>
                  </Flex>
                </ModalBody>
                {!formPage ?
                (<ModalFooter borderBottomRadius="16px" flexDirection="column">
                  <Flex direction="column" m={2} zIndex="0">
                    <Flex align="center" justify="center">
                      <Text color="white">
                        Haven&apos;t got an account yet?
                      </Text>
                      <Link to="/welcome">
                        <Heading
                          pl={2}
                          color="white"
                          fontSize="2xl"
                          zIndex="0"
                          textTransform="uppercase"
                          _hover={{ color: 'gray.300' }}
                        >
                          Sign up &rarr;
                        </Heading>
                      </Link>
                    </Flex>
                  </Flex>
                </ModalFooter>) : (<ModalFooter></ModalFooter>)}
              </ModalContent>
            )}
          </ModalOverlay>
        </Modal>
  );
};

export default Header;
