/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from '@reach/router';

const linkContainers = css`
  margin: 50px;
  font-size: 20px;
`;
const links = css`
color: white;
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    };
`;
const Header: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: 10px;
        height: 30px;
        background-color: #9F465F;
      `}
    >
      <div>
        <Link to="/" css={css`
        color: black;
        margin: 20px;
        text-decoration: none;
        font-size: 30px;
      `} >Measured (Logo)</Link>
          
      </div>
      <div
        css={css`
          display: flex;
          margin-left: 40px;
        `}
      >
        <div css={linkContainers}>
          <Link css={links} to="/ingredients">
            Browse Ingredients
          </Link>
        </div>
        <div css={linkContainers}>
          <Link css={links} to="/drinkBuilder">
            Build a Cocktail
          </Link>
        </div>
        <div css={linkContainers}>
          <Link css={links} to="/myBar">
            My Bar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
