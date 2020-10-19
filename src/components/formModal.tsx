import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
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

const FormModal: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

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

  const onSignIn = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    auth.signInWithEmailAndPassword(email, password);
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      margin="10px"
      width="100%"
    >
      <Flex width="35%" direction="column" justify="center" align="center">
        <FormControl width="100%">
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
        </FormControl>
        <Flex width="100%">
          <Button
            width="50%"
            marginRight="5px"
            marginTop="10px"
            onClick={onSignIn}
          >
            Sign in
          </Button>
          <Button
            isTruncated
            leftIcon={<FcGoogle />}
            width="50%"
            marginLeft="5px"
            marginTop="10px"
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </Flex>
      </Flex>
      <Flex width="35%" direction="column" justify="center" align="center">
        <Flex justify="center" align="center">
          <Text textDecoration="underline">Haven't got an account?</Text>
          <Button width="25%" variant="ghost" margin="5px" onClick={onOpen}>
            Sign up
          </Button>
        </Flex>
      </Flex>
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
                  placeholder="Email"
                  type="email"
                  value={newEmail}
                  onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                    setNewEmail(value.target.value)
                  }
                />
              </FormControl>
              <FormControl mt={4} isRequired>
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
  );
};

export default FormModal;
