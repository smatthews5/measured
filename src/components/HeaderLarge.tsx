import React, {useState} from 'react';
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
} from '@chakra-ui/core';
import { signInWithGoogle } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../services/firebase';

import icon from '../assets/images/header_icon.png';

const responsiveFontSize = ['lg', '2xl', '3xl', '4xl'];
const responsiveWidth = ['7.5vw', '12.5vw', '17.5vw', '20vw'];
const responsiveImage = ['15px', '30px', '40px', ' 50px'];

const HeaderLarge: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const googleSignIn = () => {
    signInWithGoogle();
    setTimeout(() => onClose(), 1000);
  };
  const emailSignIn = async () => {
    try {
      auth.signInWithEmailAndPassword(email, password);
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error(error);
    }
  };

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
        <Image
          w={responsiveImage}
          h={responsiveImage}
          src={icon}
          objectFit="cover"
          alt="Login/signup icon"
          mb={3}
          onClick={onOpen}
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent borderRadius="8px">
              <ModalHeader alignSelf="center">
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
                      onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(value.target.value)
                      }
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
                      onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(value.target.value)
                      }
                    />
                  </FormControl>
                </Flex>
              </ModalBody>
              <ModalFooter borderBottomRadius="8px" flexDirection="column">
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
                      Haven't got an account?
                    </Text>
                    <Link to="/welcome">
                      <Text marginLeft="5px">Sign up!</Text>
                    </Link>
                  </Flex>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>

        <Modal isOpen={show} onClose={onClose}>
          <ModalOverlay>
            <ModalContent borderRadius="8px">
              <ModalHeader alignSelf="center">
                Cocktails to your account
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
                      onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(value.target.value)
                      }
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
                      onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(value.target.value)
                      }
                    />
                  </FormControl>
                </Flex>
              </ModalBody>
              <ModalFooter borderBottomRadius="8px" flexDirection="column">
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
                      Haven't got an account?
                    </Text>
                    <Link to="/welcome">
                      <Text marginLeft="5px">Sign up!</Text>
                    </Link>
                  </Flex>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </Flex>
    </header>
  );
};

export default HeaderLarge;
