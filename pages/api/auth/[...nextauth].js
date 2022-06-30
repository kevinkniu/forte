/* eslint no-param-reassign: "off" */

import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: 'https://accounts.spotify.com/authorize?scope=streaming,user-read-email,user-read-private,user-read-playback-state,user-modify-playback-state,playlist-read-private',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.tokenID = token.accessToken;
      }
      return session;
    },
    jwt: async ({ user, account, token }) => {
      if (account) {
        token.accessToken = account.access_token;
        account.access_token = user.accessToken;
      }
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
});

// import NextAuth from 'next-auth';
// import FacebookProvider from 'next-auth/providers/facebook';

// export default NextAuth({
//   providers: [
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     session: async ({ session, token }) => {
//       if (session?.user) {
//         session.user.id = token.uid;
//       }
//       return session;
//     },
//     jwt: async ({ user, token }) => {
//       if (user) {
//         token.uid = user.id;
//       }
//       return token;
//     },
//   },
//   session: {
//     strategy: 'jwt',
//   },
// });
