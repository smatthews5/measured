/** @jsx jsx */
import React from 'react';
import { Link } from '@reach/router';
import { css, jsx } from '@emotion/core';
import { Flex, Image, useTheme } from '@chakra-ui/core';
import icon from '../assets/images/user_icon.png';

const HeaderLarge: React.FC = () => {
  const theme = useTheme();
  return (
    <header
      css={css`
        height: 15vh;
        background-color: ${theme.colors.lead};
      `}
    >
      <Flex pl={4} width="25vw">
        <Link to="/">
          <h1
            css={css`
              font-size: 5em;
              color: ${theme.colors.white};
            `}
          >
            Measured
          </h1>
        </Link>
      </Flex>
      <Flex justify="space-between" align="center" width="50vw" pr={4}>
        <Link to="/ingredients">
          <h2>Browse ingredients</h2>
        </Link>
        <Link to="/build-a-drink">
          <h2>Build a cocktail</h2>
        </Link>
        <Link to="/my-bar">
          <h2>Explore my bar</h2>
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

export default HeaderLarge;
