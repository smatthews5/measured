import { theme } from '@chakra-ui/core';

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: '"Cabin", sans-serif',
    heading: '"Yanone Kaffeesatz", sans-serif',
    mono: '"Wire One", sans-serif',
  },
  colors: {
    ...theme.colors,
    white: '#fff',
    black: '#000',
    lead: '#9f465f',
    highlight: '#A57194',
    pale: '#FAE9F4',
    dark: '#564146',
    grey: '#808080',
  },
};

export default customTheme;
