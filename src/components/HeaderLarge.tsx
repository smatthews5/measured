/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from '@reach/router';

const linkContainers = css`
  margin: 30px;
  font-size: 30px;
`;
const links = css`
color: #C67833;
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    };
`;
const HeaderLarge: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        border-bottom: 1px solid grey;
        align-items: center;
        padding: 10px;
        height: 80px;
      `}
    >
      <div>
        <h1
          css={css`
            color: #2c631f;
            margin: 20px;
          `}
        >
          Measured (Logo)
        </h1>
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

export default HeaderLarge;
