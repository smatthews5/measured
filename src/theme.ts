import { theme } from '@chakra-ui/core';

export default {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: '"Cabin", sans-serif',
    title: '"Yanone Kaffeesatz", sans-serif',
    fancy: '"Wire One", sans-serif',
  },
  colors: {
    ...theme.colors,
    white: '#ffffff',
    black: '#000000',
    lead: '',
    highlight: '',
    pale: '',
    dark: '',
  },
};
