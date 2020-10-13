import React from 'react';
import { Link } from '@reach/router';
import { Flex, Heading, Image } from '@chakra-ui/core';
import icon from '../assets/images/header_large_icon.png';

const responsiveFontSize = ['lg', '2xl', '3xl', '4xl'];
const responsiveWidth = ['7.5vw', '12.5vw', '17.5vw', '20vw'];
const responsiveImage = ['15px', '30px', '40px', ' 50px'];

const HeaderLarge: React.FC = () => {
  return (
    <header id="large">
      <Flex pl={4} width="25vw" align="center">
        <Link to="/">
          <Heading as="h1" color="white" fontSize={['4xl', '6vw']}>
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
            color="purple.200"
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
            color="purple.200"
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
            color="purple.200"
            fontSize={responsiveFontSize}
            maxWidth={responsiveWidth}
            isTruncated
          >
            Explore my bar
          </Heading>
        </Link>
        <Link to="/welcome">
          <Image
            w={responsiveImage}
            h={responsiveImage}
            src={icon}
            objectFit="cover"
            alt="Login/signup icon"
            mb={3}
          />
        </Link>
      </Flex>
    </header>
  );
};

export default HeaderLarge;
