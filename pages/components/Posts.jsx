import Head from 'next/head';
import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import BottomNav from './BottomNav';
import InputBox from './InputBox';
import { AppContext } from '../_app';

export default function Home() {
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;
  const [drawer, setDrawer] = useState(false);

  return (
    <div>
      <div align="center">
        <div>
          <Box sx={{ display: 'flex', mx: 5, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Avatar src={sessionObj?.image} alt="N/A" />
            <Box
              sx={{ ml: 1, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 5 }}
              onClick={() => { setDrawer(true); }}
            >
              What&#39;s on your mind?
            </Box>
          </Box>
          <Drawer
            anchor="top"
            open={drawer}
            onClose={() => { setDrawer(false); }}
          >
            <div>
              <InputBox />
            </div>
          </Drawer>
        </div>

        Posts Here
      </div>

      <BottomNav />

    </div>
  );
}
