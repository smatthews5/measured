import React from 'react';
import { Link } from '@reach/router';
import { Flex, Image } from '@chakra-ui/core';
import icon from '../assets/images/user_icon_reverse.png';

const Header: React.FC = () => {
  return (
    <header>
      <Flex pl={4}>
        <Link to="/">
          <h1>Measured</h1>
        </Link>
      </Flex>
      <Flex justify="space-between" align="center" width="40vw" pr={4}>
        <Link to="/ingredients">
          <h3>Browse ingredients</h3>
        </Link>
        <Link to="/build-a-drink">
          <h3>Build a cocktail</h3>
        </Link>
        <Link to="/my-bar">
          <h3>Explore my bar</h3>
        </Link>
        <Link to="/welcome">
          <Image
            size="50px"
            objectFit="cover"
            src={icon}
            alt="Login/signup icon"
          />
        </Link>
      </Flex>
    </header>
  );
};

export default Header;
