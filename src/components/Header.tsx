import React, { useState, useContext } from 'react';
import { Link, navigate } from '@reach/router';
import { UserContext } from '../Context';

import { signInWithGoogle, signOut } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../services/firebase';
import loginBG from '../assets/images/loginBg.png'
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Image,
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

const Header: React.FC = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const successfullLogin = () => {
    const message = toast({
      title: "Hey, you're logged in!!",
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    return message;
  };

  const googleSignIn = () => {
    signInWithGoogle();
    setTimeout(() => successfullLogin(), 1000);
    setTimeout(() => onClose(), 1000);
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
      await auth.signInWithEmailAndPassword(email, password).catch((error) => {
        const errors = error.message;
        setErrors(errors);
        if (errors) {
          showErrors(errors);
        } else {
          setTimeout(() => successfullLogin(), 1000);
          setTimeout(() => onClose(), 1000);
        }
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
          />
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
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
                <Text
                  alignSelf="center"
                  textDecoration="underline"
                  color="white"
                  zIndex='0'
                  fontSize='30px'
                >
                  Sign out
                </Text>
                <ModalCloseButton color="white"/>
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
                <ModalHeader
                  alignSelf="center"
                  textDecoration="underline"
                  color="white"
                  zIndex="0"
                  bgColor="#9F465F"
                >
                  Login to your account
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
                      Login with Google
                    </Button>
                    <Text marginTop="30px" color="white" zIndex="0">
                      or
                    </Text>
                    <FormControl mt={4} isRequired>
                      <FormLabel padding="2px" margin="2px" color="white">
                        email
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
                      <FormLabel padding="2px" margin="2px" color="white">
                        password
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
                  <Flex direction="column" margin="10px" zIndex='0'>
                    <Flex>
                      <Text textDecoration="underline" color='white'>
                        Haven&apos;t got an account?
                      </Text>
                      <Link to="/welcome">
                        <Text marginLeft="5px" color="white">Sign up!</Text>
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
