/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import drink from '../tempAsset/images/americano.jpeg';
const Card: React.FC = () => {
  return (
    <div
      css={css`
        height: 200px;
        width: 220px;
        border-radius: 4px;
        box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.75);
        margin: 10px;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          flex: 1;
          justify-content: center;
        `}
      >
        <img
          css={css`
            width: 220px;
            height: 200px;
            object-fit: cover;
            border-radius: 4px;
            /* border-top-right-radius: 4px; */
          `}
          src={drink}
          alt=""
        />
        <div
          css={css`
            position: absolute;
            margin-top: 170px;
            margin-left: 170px;
          `}
        >
          <span
            css={css`
            `}
            role="img"
            aria-label="heart"
          >
            {' '}
            ♥️
          </span>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: 100%;
        `}
      >
        <div
          css={css`
            padding: 2px;
            align-items: center;
          `}
        >
          <div
            css={css`
              padding: 3px;
              font-family: 'Cabin';
              font-size: 14px;
              width: 100px;
              align-items: center;
            `}
          >
            Americano
          </div>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            padding: 2px;
            width: 100px;
            justify-content: space-around;
            align-items: center;
          `}
        >
          <div
            css={css`
              margin-right: 5px;
              font-family: 'Cabin';
              font-style: italic;
              font-size: 10px;
            `}
          >
            Gin
          </div>
          <div
            css={css`
              font-family: 'Cabin';
              font-style: italic;
              font-size: 10px;
            `}
          >
            Refreshing
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
