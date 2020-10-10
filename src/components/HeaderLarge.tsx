/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from '@reach/router';

const linkContainers = css`
  margin-Left: 70px;
`;
const links = css`
  color: #c67833;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  font-family: 'Yanone Kaffeesatz';
  font-size: 24px;
  font-weight: 400;
`;
const HeaderLarge: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        border-bottom: 1px solid #d3d3d3;
        align-items: center;
        margin: 10px;
        height: 100px;
      `}
    >
      <div>
        <h1
          css={css`
            color: #2c631f;
            font-size: 56px;
            font-family: 'Yanone Kaffeesatz';
            font-weight: 600;
          `}
        >
          MEASURED
        </h1>
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

export default HeaderLarge;
