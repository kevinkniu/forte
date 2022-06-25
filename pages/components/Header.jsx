import React, { useRef, useContext } from "react";
import Image from "next/image";
import Router from "next/router";
import { signOut, useSession } from "next-auth/react";
import AppBar from "@mui/material/AppBar";

const Header = () => {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;

  return (
    <AppBar position="fixed">
      This is a header.
    </AppBar>
  )
}

export default Header;
