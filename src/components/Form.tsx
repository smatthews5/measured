import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Text,
  Image,
  useToast,
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
import { auth, createUserProfileDocument } from '../services/firebase';
import { navigate } from '@reach/router';

import loginBG from '../assets/images/loginBG.png';

const Form: React.FC = () => {
  const toast = useToast();
  const [displayName, setDisplayName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

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
      title: `Hey ${displayName}, you've successfully set up an account!`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    return message;
  };
  const successfullLogin = () => {
    const message = toast({
      title: `Hey, you're logged in!!`,
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
      createUserProfileDocument(user, { displayName });
      newAccountMessage(displayName);
      navigate('/');
    } catch (error) {
      const errors = error.message;
      setErrors(errors);
      showErrors(errors);
    }
    setDisplayName('');
    setNewEmail('');
    setNewPassword('');
  };
  const googleSignIn = () => {
    signInWithGoogle();
    setTimeout(() => successfullLogin(), 1000);
    setTimeout(() => onClose(), 1000);
    navigate('/');
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
          <Button
            minWidth="200px"
            leftIcon={<FcGoogle />}
            width="50%"
            margin="20px"
            onClick={googleSignIn}
            bgColor="white"
            _hover={{ bgColor: 'white' }}
            color="gray"
            border="0.5px solid lightGray"
            boxShadow="0px 0px 10px 0.5px rgba(0,0,0,0.15)"
          >
            Sign up with Google
          </Button>
          <Text margin="20px">Or</Text>
          <FormControl width="100%" isRequired>
            <FormLabel color="white">Display Name</FormLabel>
            <Input
              marginBottom="20px"
              placeholder="Display name"
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
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
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
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Form;
