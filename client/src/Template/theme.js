import createTheme from "@mui/material/styles/createTheme";

const defaulttheme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#0381ff', //blue
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      
      secondary: {
        light: '#0381ff',
        main: '#001487', //dark
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffffff',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
      typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
          fontSize: '2rem',
          fontWeight: 700,
          color: '#001487', // Secondary main color
        },
        h2: {
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#001487', // Secondary main color
        },
        body1: {
          fontSize: '1rem',
          color: '#0381ff', // Primary main color
        },
        button: {
          textTransform: 'none',
        },
      },
    },
  });
  export default defaulttheme;