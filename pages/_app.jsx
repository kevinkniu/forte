/* eslint react/jsx-no-constructed-context-values: "off" */
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useState, createContext } from 'react';

export const AppContext = createContext();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [value, setValue] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentRelease, setCurrentRelease] = useState([]);

  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
}

export default MyApp;
