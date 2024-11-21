'use client';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'dark',
  },
});

// Renewed color palette
const palette = {
  primary: {
    main: '#3a4a68', // Muted blue
    light: '#5f6e8a', // Softer blue
    dark: '#1f2e48', // Deep blue
    contrastText: '#ffffff', // White for buttons and headings
  },
  secondary: {
    main: '#8c8c8c', // Neutral gray
    light: '#bdbdbd',
    dark: '#5c5c5c',
    contrastText: '#ffffff',
  },
  neutral: {
    light: '#f9f9f9', // Off-white
    dark: '#121212', // Rich black-gray
    contrastText: '#9e9e9e', // Medium gray for subtle text
  },
  text: {
    light: '#2e2e2e', // Dark gray for light mode
    dark: '#e0e0e0', // Light gray for dark mode
  },
  background: {
    light: '#ffffff', // Crisp white
    dark: '#1c1c1c', // Deep gray
    paperLight: '#f4f4f4', // Subtle gray
    paperDark: '#242424', // Lighter gray for dark mode cards
  },
};

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: palette.primary,
    secondary: palette.secondary,
    background: {
      default: palette.background.light,
      paper: palette.background.paperLight,
    },
    text: {
      primary: palette.text.light,
      secondary: palette.neutral.contrastText,
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '3rem', // Large, bold, and modern
      fontWeight: 700,
      color: palette.primary.main,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: palette.primary.dark,
      lineHeight: 1.4,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      color: palette.primary.main,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: palette.text.light,
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.9rem',
      fontWeight: 400,
      color: palette.neutral.contrastText,
      lineHeight: 1.6,
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: palette.primary,
    secondary: palette.secondary,
    background: {
      default: palette.background.dark,
      paper: palette.background.paperDark,
    },
    text: {
      primary: palette.text.dark,
      secondary: palette.neutral.light,
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '3rem', // Large, bold, and modern
      fontWeight: 700,
      color: palette.primary.light,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: palette.primary.light,
      lineHeight: 1.4,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      color: palette.primary.light,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: palette.text.dark,
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.9rem',
      fontWeight: 400,
      color: palette.neutral.contrastText,
      lineHeight: 1.6,
    },
  },
});

export {lightTheme, darkTheme};

export default theme;
