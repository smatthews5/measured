import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import theme from './theme';
import { injectGlobal } from 'emotion';
import { css, Global } from '@emotion/core';
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core';

// import all fonts
injectGlobal`
@font-face {
  font-family: 'Cabin';
  font-style: italic;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cabin/v17/u-4g0qWljRw-Pd815fNqc8T_wAFcX-c37OnuHXisAZFx.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Cabin';
  font-style: italic;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cabin/v17/u-4g0qWljRw-Pd815fNqc8T_wAFcX-c37OnuHXisAZFx.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Cabin';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cabin/v17/u-4i0qWljRw-PfU81xCKCpdpbgZJl6XvqdnsF3-OAw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Cabin';
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cabin/v17/u-4i0qWljRw-PfU81xCKCpdpbgZJl6XvqdnsF3-OAw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Wire One';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Wire One'), local('WireOne'), url(https://fonts.gstatic.com/s/wireone/v11/qFdH35Wah5htUhV75VGlU9vgwBcI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Yanone Kaffeesatz';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/yanonekaffeesatz/v15/3y976aknfjLm_3lMKjiMgmUUYBs04Y8bH-qHHt6M.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Yanone Kaffeesatz';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/yanonekaffeesatz/v15/3y976aknfjLm_3lMKjiMgmUUYBs04Y8bH-qHHt6M.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;

            ::-webkit-scrollbar {
              width: 0;
              background: transparent;
            }
          }

          html,
          body {
            font-family: 'Cabin', Helvetica, sans-serif, 'Apple Color Emoji',
              'Segoe UI Emoji', 'Segoe UI Symbol';
            height: 100vw;
            width: 100vw;
            overflow: scroll;
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1em;
            height: 10vh;
            border-bottom: 1px solid ${theme.colors.pale};
          }

          main {
          }

          footer {
          }

          h1,
          h2,
          h3 {
            color: ${theme.colors.lead};
            font-family: ${theme.fonts.heading};
            font-weight: 600;
            text-transform: uppercase;
            text-decoration: none;
            padding-top: 8%;
          }
          h4 {
            font-family: ${theme.fonts.body};
            font-weight: 400;
            color: ${theme.colors.grey}
          }
          h5 {
            font-family: ${theme.fonts.body};
            font-weight: 400;
            font-size: 10px;
            font-style: italic;
            color: ${theme.colors.grey}
          }

          h1 {
            font-size: 3.5em;
          }

          h2 {
            font-size: 2em;
            color: ${theme.colors.pale};
          }

          h3 {
            color: ${theme.colors.highlight};
            font-size: 1.5em;
          }

          button {
          }

          a {
            margin: 0;
          }

          form {
          }
        `}
      />
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
