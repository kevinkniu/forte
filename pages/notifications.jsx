import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useContext } from 'react';
import { Button, Avatar } from '@mui/material';
import Router from 'next/router';
import BottomNav from './components/BottomNav';
import { AppContext } from './_app';

export default function Notifications() {
  const { data: getSession, status } = useSession();
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const sessionObj = getSession?.user;

  const initializeUser = async () => {
    const response = await fetch(`/api/users/${sessionObj?.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    const user = result[0]._delegate._document.data.value.mapValue.fields;
    setCurrentUser(user);
  };

  useEffect(() => {
    if (!currentUser) {
      if (status !== 'authenticated') {
        return;
      }
      initializeUser();
    }
  }, [status]);

  return (
    <div>
      <h1 align="center">
        Notifications
      </h1>

      <BottomNav />
    </div>
  );
}
