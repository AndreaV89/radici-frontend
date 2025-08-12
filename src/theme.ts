import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6D1E20', // Il nostro rosso Chianti
    },
    secondary: {
      main: '#71746F', // Il nostro verde salvia
    },
    background: {
      default: '#FDFBF7', // Lo sfondo caldo
      paper: '#FFFFFF', // Lo sfondo per gli elementi "su carta" come le Card
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif', // Font di default per tutto
    h1: {
      fontFamily: 'Playfair Display, serif', // Font specifico per h1
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
    },
    h4: {
      fontFamily: 'Playfair Display, serif',
    },
    h5: {
      fontFamily: 'Playfair Display, serif',
    },
    h6: {
      fontFamily: 'Playfair Display, serif',
    },
  },
});

export default theme;