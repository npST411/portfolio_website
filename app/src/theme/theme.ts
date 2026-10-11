import { createTheme } from '@mui/material/styles';
import { ACCENT, BG, ON_ACCENT, SURFACE, TEXT, TEXT_BODY } from './colors';

// Dark mode, so MUI's own surfaces (menus, tooltips, dialogs) match the page
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: ACCENT,
      contrastText: ON_ACCENT,
    },
    secondary: {
      main: '#3C3D37',
    },
    background: {
      default: BG,
      paper: SURFACE,
    },
    text: {
      primary: TEXT,
      secondary: TEXT_BODY,
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
