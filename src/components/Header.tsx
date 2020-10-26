import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { UserContext } from '../Context';

import FormModal from './formModal';

import { Flex, Heading, Image, useDisclosure } from '@chakra-ui/core';

import icon from '../assets/images/header_icon.png';
import loading from '../assets/images/loading.png';

const Header: React.FC = () => {
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onHomepage = location.pathname === '/';
  const responsiveFontSize = ['md', 'lg', '3xl', '4xl'];
  const responsiveWidth = ['7vw', '10vw', '15vw', '18vw'];
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
            maxWidth={['7vw', '12vw', '17vw', '20vw']}
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
            src={icon}
            alt="Login/signup icon"
            mb={2}
            onClick={onOpen}
            cursor="pointer"
          />
        </Flex>
        <FormModal onClose={onClose} isOpen={isOpen} user={user} />
      </Flex>
    </header>
  );
};

export default Header;
