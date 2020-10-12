import { extendTheme } from '@chakra-ui/core';

const customTheme = extendTheme({
  colors: {
    purple: {
      100: '#fff', // white
      200: '#FAE9F4', // pale
      300: '#A57194', // highlight
      400: '#9f465f', // lead
      500: '#564146', // dark
      900: '#000', // black
    },
  },
  fonts: {
    body: '"Cabin", sans-serif',
    heading: '"Yanone Kaffeesatz", sans-serif',
    mono: '"Wire One", sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'body',
        boxSizing: 'border-box',
        margin: '0',
        padding: '0',
        height: '100vw',
        width: '100vw',
        overflow: 'scroll',
        '::-webkit-scrollbar': {
          width: '0',
          background: 'transparent',
        },
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1em',
        height: '10vh',
        minHeight: '6.5vw',
        borderBottom: '1px solid purple.200',
      },
      'h1, h2, h3': {
        fontFamily: 'heading',
        textTransform: 'uppercase',
        textDecoration: 'none',
        paddingTop: '8%',
        fontWeight: '600',
      },
      h1: {
        fontSize: '4vw',
        color: 'purple.400',
      },

      h2: {
        fontSize: '2.5vw',
        color: 'purple.200',
      },

      h3: {
        color: 'purple.300',
        fontSize: '2vw',
      },
      h4 {
            fontWeight: '400',
            color: 'gray.400',
          },
      h5 {
            fontWeight: '400',
            fontSize: '10px',
            fontStyle: 'italic',
            color: 'gray.400',
          },
    },
  },
});

export default customTheme;
