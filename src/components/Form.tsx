import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
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
import { signInWithGoogle, signOut } from '../services/firebase';
import { FcGoogle } from 'react-icons/fc';
import { auth, createUserProfileDocument } from '../services/firebase';

const Form: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      createUserProfileDocument(user, { displayName });
      // setTimeout message to say success
      //redirect home..
    } catch (error) {
      console.error('form error', error);
    }
    setDisplayName('');
    setEmail('');
    setPassword('');
  };

  const onSignIn = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    auth.signInWithEmailAndPassword(email, password);
  };

  return (
    <Flex justify="center" align="center" direction="column" margin="10px">
      <Text fontSize="40px"> SIGN IN </Text>
      <FormControl width="50%" isRequired>
        <FormLabel padding="2px" margin="2px">
          Email address
        </FormLabel>
        <Input
          // placeholder="Email"
          type="email"
          value={email}
          onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(value.target.value)
          }
        />
        <FormLabel padding="2px" margin="2px">
          Password
        </FormLabel>
        <Input
          // placeholder="Password"
          type="password"
          value={password}
          onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(value.target.value)
          }
        />
        <FormHelperText>We'll never share this data.</FormHelperText>
      </FormControl>

      <Flex width="100%" justify="center" align="center">
        <Button width="25%" margin="5px" onClick={onSignIn}>
          Sign in
        </Button>
        <Button
          isTruncated
          leftIcon={<FcGoogle />}
          width="25%"
          margin="5px"
          onClick={signInWithGoogle}
        >
          Google sign in
        </Button>
      </Flex>
      <Flex justify="center" align="center">
        <Text textDecoration='underline'>Haven't got an account?</Text>
        <Button width="25%" variant="ghost" margin="5px" onClick={onOpen}>
          Sign up
        </Button>
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>Display Name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Display name"
                    value={displayName}
                    onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                      setDisplayName(value.target.value)
                    }
                  />
                </FormControl>

                <FormControl mt={4} isRequired>
                  <FormLabel padding="2px" margin="2px">
                    Email address
                  </FormLabel>
                  <Input
                    ref={initialRef}
                    type="email"
                    value={email}
                    onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(value.target.value)
                    }
                  />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel padding="2px" margin="2px">
                    Password
                  </FormLabel>
                  <Input
                    ref={initialRef}
                    type="password"
                    value={password}
                    onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(value.target.value)
                    }
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                  Sign Up
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default Form;
