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
      '*': {
        boxSizing: 'border-box',
        margin: '0',
        padding: '0',
      },
      'html, body': {
        font: 'body',
        height: '100vh',
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
      'header[id="large"]': {
        backgroundColor: 'purple.400',
        height: '15vh',
      },
      'div::-webkit-scrollbar': {
        height: '1vh',
        padding: '20px',
      },
      'div::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px gray.200',
      },
      'div::-webkit-scrollbar-thumb': {
        bgColor: 'gray.100',
        backgroundClip: 'content-box',
      },
      'h1, h2': {
        fontFamily: 'heading',
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: '600',
        paddingTop: '3%',
      },
      h1: {
        paddingTop: '15%',
        paddingBottom: '8%',
        color: 'purple.400',
      },
      h3: {
        color: 'white',
      },
      h4: {
        color: 'black',
        fontWeight: '400',
      },
      h5: {
        fontWeight: '400',
        fontSize: '10px',
        fontStyle: 'italic',
        color: 'gray.400',
      },
      hr: {
        borderBottom: 'solid thin white',
        width: '80%',
      },
      select: {
        isTruncated: 'true',
        color: 'purple.300',
        fontFamily: 'body',
        focusBorderColor: 'purple.200',
        fontSize: ['10px', '16px', '16px', '16px'],
        textTransform: 'lowercase',
        multiple: 'true',
      },
    },
  },
  components: {
    Flex: {
      baseStyle: {
        align: 'center',
      },
    },
  },
});

export default customTheme;
