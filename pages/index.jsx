import Head from 'next/head';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import Router from "next/router";

export default function Home() {
  const { getSession, status } = useSession();
  const sessionObj = getSession?.user;

  console.log('sessionObj:', sessionObj);
  console.log('status:', status);

  // this needs to be changed after spotify redirect URL is whitelisted
  if (status === 'unauthenticated') {
    Router.push('/home');
  } else {
    return (
      <main className={styles.main}>
        <h1 onClick={() => {signIn()}}>
          Sign In
        </h1>
      </main>
    )
  }
}