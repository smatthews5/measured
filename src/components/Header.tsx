/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from '@reach/router';

const linkContainers = css`
  margin-left: 70px;
`;
const links = css`
  color: white;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  font-size: 24px;
  font-family: 'Yanone Kaffeesatz';
  font-weight:400;
`;
const Header: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        background-color: #9f465f;
      `}
    >
      <div css={css`display:flex; padding: 10px;`}>
        <Link
          to="/"
          css={css`
            color: white;
            text-decoration: none;
            font-size: 48px;
            font-family: 'Yanone Kaffeesatz';
            font-weight: 600;
          `}
        >
          MEASURED
        </Link>
      </div>
      <div
        css={css`
          display: flex;
          margin-left: 100px;
        `}
      >
        <div css={linkContainers}>
          <Link css={links} to="/ingredients">
            BROWSE INGREDIENTS
          </Link>
        </div>
        <div css={linkContainers}>
          <Link css={links} to="/drinkBuilder">
            BUILD A COCKTAIL
          </Link>
        </div>
        <div css={linkContainers}>
          <Link css={links} to="/myBar">
            MY BAR
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
