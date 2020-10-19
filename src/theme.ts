import { extendTheme } from '@chakra-ui/core';

const customTheme = extendTheme({
  colors: {
    purple: {
      100: '#faf9ea', // cream
      200: '#FAE9F4', // pale
      300: '#A57194', // highlight
      400: '#9f465f', // lead
      500: '#564146', // dark
      900: '#000', // black
    },
    gray: {
      100: '#f8f9fa',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#6c757d',
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
        paddingTop: '1.2em',
        height: '12vh',
        minHeight: '6.5vw',
        borderBottom: '1px solid purple.200',
        bgColor: 'white',
      },
      'header[id="large"]': {
        height: '16vh',
      },
      'div[id="fixed"]': {
        position: 'fixed',
        w: '100%',
        zIndex: '100',
      },
      'div[id="scroll"]': {
        pt: '12vh',
      },
      'div[id="scroll-large"]': {
        pt: '16vh',
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
        color: 'purple.400',
        textTransform: 'uppercase',
      },
      'h3::first-letter': {
        textTransform: 'capitalize',
      },
      h4: {
        color: 'purple.400',
        fontWeight: '400',
      },
      'h5, h6': {
        fontWeight: '400',
        color: 'gray.500',
      },
      h6: {
        fontStyle: 'italic',
      },
      p: {
        fontSize: 'md',
      },
      'p::first-letter': {
        textTransform: 'capitalize',
      },
      hr: {
        borderBottom: 'solid thin white',
        width: '80%',
      },
      'hr[id="wide"]': {
        width: '90%',
      },
      select: {
        isTruncated: 'true',
        color: 'black',
        fontFamily: 'body',
        focusBorderColor: 'purple.400',
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
