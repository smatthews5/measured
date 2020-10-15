import React from 'react';
import { Link } from '@reach/router';
import { Flex, Image, Heading } from '@chakra-ui/core';
import icon from '../assets/images/header_icon.png';

const responsiveFontSize = ['lg', 'xl', '3xl', '4xl'];
const responsiveWidth = ['7.5vw', '12.5vw', '17.5vw', '20vw'];
const responsiveImage = ['15px', '30px', '40px', ' 50px'];

const Header: React.FC = () => {
  return (
    <header>
      <Flex pl={4}>
        <Link to="/">
          <Heading as="h1" fontSize={['3xl', '4xl', '6xl', '8xl']}>
            Measured
          </Heading>
        </Link>
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        width={['45vw', '55vw', '60vw', '65vw']}
        pr={4}
      >
        <Link to="/ingredients">
          <Heading
            as="h3"
            fontSize={responsiveFontSize}
            maxWidth={responsiveWidth}
            color="purple.400"
            isTruncated
          >
            browse ingredients
          </Heading>
        </Link>
        <Link to="/build-a-drink">
          <Heading
            as="h3"
            fontSize={responsiveFontSize}
            maxWidth={responsiveWidth}
            color="purple.400"
            isTruncated
          >
            build a cocktail
          </Heading>
        </Link>
        <Link to="/my-bar">
          <Heading
            as="h3"
            fontSize={responsiveFontSize}
            maxWidth={responsiveWidth}
            color="purple.400"
            isTruncated
          >
            explore my bar
          </Heading>
        </Link>
        <Link to="/welcome">
          <Image
            w={responsiveImage}
            h={responsiveImage}
            objectFit="cover"
            src={icon}
            alt="Login/signup icon"
            mb={2}
          />
        </Link>
      </Flex>
    </header>
  );
};

export default Header;
