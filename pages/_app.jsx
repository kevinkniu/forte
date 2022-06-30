/* eslint react/jsx-no-constructed-context-values: "off" */
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useState, createContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
});

export const AppContext = createContext();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [value, setValue] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentRelease, setCurrentRelease] = useState([]);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{
          value,
          setValue,
          currentUser,
          setCurrentUser,
          currentPlaylist,
          setCurrentPlaylist,
          currentRelease,
          setCurrentRelease }}
        >
          <Component {...pageProps} />
        </AppContext.Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
