import React, { useState, useContext } from 'react';
import { Link } from '@reach/router';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Image,
  Heading,
  Button,
  Text,
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
import { UserContext } from '../Context';
import { navigate } from '@reach/router';

import { signInWithGoogle, signOut } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../services/firebase';

import icon from '../assets/images/header_icon.png';

const responsiveFontSize = ['lg', '2xl', '3xl', '4xl'];
const responsiveWidth = ['7.5vw', '12.5vw', '17.5vw', '20vw'];
const responsiveImage = ['15px', '30px', '40px', ' 50px'];
const responsiveImageBorder = ['25px', '40px', '50px', ' 60px'];

const HeaderLarge: React.FC = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const googleSignIn = () => {
    signInWithGoogle();
    setTimeout(() => onClose(), 1000);
  };
  const showErrors = (errorMessage: string) => {
    const errors = toast({
      title: 'Error in form. Please try again!',
      description: errorMessage,
      duration: 9000,
      isClosable: true,
    });
    return errors;
  };

  const emailSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password).catch((error) => {
        const errors = error.message;
        setErrors(errors);
        if (errors) {
          showErrors(errors);
        } else setTimeout(() => onClose(), 1000);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  const signUserOut = () => {
    signOut();
    navigate('/');
  };

  const border = user ? '2px solid maroon' : '0px';
  const radius = user ? '50px' : '0px';

  return (
    <header id="large">
      <Flex pl={4} width="25vw" align="center">
        <Link to="/">
          <Heading as="h1" color="purple.400" fontSize={['4xl', '6vw']}>
            Measured
          </Heading>
        </Link>
      </Flex>
      <Flex
        pr={4}
        justify="space-between"
        align="center"
        width={['45vw', '55vw', '60vw', '65vw']}
      >
        <Link to="/ingredients">
          <Heading
            as="h2"
            color="purple.400"
            fontSize={responsiveFontSize}
            maxWidth={responsiveWidth}
            isTruncated
          >
            Browse ingredients
          </Heading>
        </Link>
        <Link to="/build-a-drink">
          <Heading
            as="h2"
            color="purple.400"
            fontSize={responsiveFontSize}
            maxWidth={responsiveWidth}
            isTruncated
          >
            Build a cocktail
          </Heading>
        </Link>
        <Link to="/my-bar">
          <Heading
            as="h2"
            color="purple.400"
            fontSize={responsiveFontSize}
            maxWidth={responsiveWidth}
            isTruncated
          >
            Explore my bar
          </Heading>
        </Link>
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
            src={icon}
            alt="Login/signup icon"
            mb={2}
            onClick={onOpen}
          />
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            {user ? (
              <ModalContent borderRadius="16px">
                <ModalHeader
                  alignSelf="center"
                  textDecoration="underline"
                  color="purple.400"
                >
                  Sign out of your account
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Flex align="center" justify="center" direction="column">
                    <Button
                      isTruncated
                      width="100%"
                      marginLeft="5px"
                      marginTop="10px"
                      onClick={signUserOut}
                      boxShadow="0px 0px 10px 0.5px rgba(0,0,0,0.15)"
                      height="55px"
                    >
                      Sign Out
                    </Button>
                  </Flex>
                </ModalBody>
              </ModalContent>
            ) : (
              <ModalContent borderRadius="16px">
                <ModalHeader
                  alignSelf="center"
                  textDecoration="underline"
                  color="purple.400"
                >
                  Login to your account
                </ModalHeader>
                <ModalCloseButton />
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
                      Login with Google
                    </Button>
                    <Text marginTop="30px">or</Text>
                    <FormControl mt={4} isRequired>
                      <FormLabel padding="2px" margin="2px">
                        E-MAIL
                      </FormLabel>
                      <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(
                          value: React.ChangeEvent<HTMLInputElement>,
                        ) => setEmail(value.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                      <FormLabel padding="2px" margin="2px">
                        PASSWORD
                      </FormLabel>
                      <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(
                          value: React.ChangeEvent<HTMLInputElement>,
                        ) => setPassword(value.target.value)}
                      />
                    </FormControl>
                  </Flex>
                </ModalBody>
                <ModalFooter borderBottomRadius="16px" flexDirection="column">
                  <Flex
                    direction="row"
                    width="75%"
                    justify="space-around"
                    margin="10px"
                  >
                    <Button
                      mr={3}
                      width="150px"
                      onClick={emailSignIn}
                      color="white"
                      bgColor="purple.400"
                      _hover={{ bgColor: 'purple.400' }}
                    >
                      Submit
                    </Button>
                  </Flex>
                  <Flex direction="column" margin="10px">
                    <Flex>
                      <Text textDecoration="underline">
                        Haven&apos;t got an account?
                      </Text>
                      <Link to="/welcome">
                        <Text marginLeft="5px">Sign up!</Text>
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

export default HeaderLarge;
