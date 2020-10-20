import React, { useState, useContext } from 'react';
import { Link, navigate } from '@reach/router';
import { UserContext } from '../Context';

import { signInWithGoogle, signOut } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../services/firebase';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  Button,
  Text,
  Image,
  useDisclosure,
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
import loginBG from '../assets/images/loginBg.png';

const Header: React.FC = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

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
          setTimeout(() => successfullLogin(), 1000);
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

  const onHomepage = location.pathname === '/';
  const responsiveFontSize = ['md', 'lg', '3xl', '4xl'];
  const responsiveWidth = ['7vw', '12vw', '17vw', '20vw'];
  const responsiveImage = ['15px', '30px', '40px', ' 50px'];
  const responsiveImageBorder = ['25px', '40px', '50px', ' 60px'];
  const border = user ? '2px solid #9f465f' : '0px'; //purple.400
  const radius = user ? '50px' : '0px';

  return (
    <header id={onHomepage ? 'large' : 'normal'}>
      <Flex pl={4} width={['15vw', '20vw', '25vw', '25vw']} align="center">
        <Link to="/">
          <Heading
            as="h1"
            fontSize={
              onHomepage
                ? ['4xl', '5xl', '8xl', '6vw']
                : ['3xl', '4xl', '6xl', '8xl']
            }
          >
            Measured
          </Heading>
        </Link>
      </Flex>
      <Flex
        pr={4}
        justify="space-between"
        align="center"
        width={['55vw', '55vw', '65vw', '70vw']}
      >
        <Link to="/ingredients">
          <Flex
            wrap="wrap"
            align="center"
            justify="center"
            textAlign="center"
            maxWidth={responsiveWidth}
          >
            <Heading as="h3" fontSize={responsiveFontSize}>
              browse ingredients
            </Heading>
          </Flex>
        </Link>
        <Link to="/build-a-drink">
          <Flex
            wrap="wrap"
            align="center"
            justify="center"
            textAlign="center"
            maxWidth={responsiveWidth}
          >
            <Heading as="h3" fontSize={responsiveFontSize}>
              build a cocktail
            </Heading>
          </Flex>
        </Link>
        {user ? (
          <Link to="/my-bar">
            <Flex
              wrap="wrap"
              align="center"
              justify="center"
              textAlign="center"
              maxWidth={responsiveWidth}
            >
              <Heading as="h3" fontSize={responsiveFontSize}>
                explore my bar
              </Heading>
            </Flex>
          </Link>
        ) : (
          <Link to="/about">
            <Flex
              wrap="wrap"
              align="center"
              justify="center"
              textAlign="center"
              maxWidth={responsiveWidth}
            >
              <Heading as="h3" fontSize={responsiveFontSize}>
                about Measured
              </Heading>
            </Flex>
          </Link>
        )}
        <Flex
          border={border}
          borderRadius={radius}
          w={responsiveImageBorder}
          h={responsiveImageBorder}
          justify="center"
          align="center"
        >
          <Image
            w={responsiveImage}
            h={responsiveImage}
            objectFit="cover"
            fallbackSrc={loading}
            src={icon}
            alt="Login/signup icon"
            mb={2}
            onClick={onOpen}
            cursor="pointer"
          />
        </Flex>
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
                      <Text
                        color="white"
                        zIndex="0"
                        fontSize="20px"
                      >
                        {user.displayName}
                      </Text>
                      <Text color="white" zIndex="0" fontSize="20px">
                        {user.email}
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
                <ModalFooter borderBottomRadius="16px" flexDirection="column">
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
                </ModalFooter>
              </ModalContent>
            )}
          </ModalOverlay>
        </Modal>
      </Flex>
    </header>
  );
};

export default Header;
