import Head from 'next/head';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Box, Button, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useContext } from 'react';
import BottomNav from '../components/BottomNav';
import { AppContext } from '../_app';

export default function userProfile() {
  const { currentUser } = useContext(AppContext);

  console.log(currentUser);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        <h1 align="center">
          This is a users profile page.
        </h1>
        <div align="center">
          <button type="submit" onClick={() => { signOut({ redirect: true, callbackUrl: '/' }); }}>Sign Out</button>
        </div>

        <Box container sx={{ border: '1px solid black' }}>
          <Grid item xs={12} sx={{ border: '1px solid black' }}>
            <Grid item sx={{ border: '1px solid black' }}>
              <Image
                src={`${currentUser?.profPic.stringValue}`}
                alt="Profile picture"
                width={200}
                height={200}
                margin="5px"
              />
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="h5" sx={{ margin: '5px' }}>
                {currentUser?.name.stringValue}
              </Typography>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Button variant="contained" sx={{ margin: '5px' }}> Add Friend </Button>
              <Button variant="contained"> Message </Button>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="h5" sx={{ margin: '5px' }}> Genres</Typography>
              <Button variant="contained" sx={{ margin: '5px' }}> EDM  </Button>
              <Button variant="contained"> KPOP </Button>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="h5" sx={{ margin: '5px' }}> Liked Songs </Typography>
              <Grid item sx={{ border: '1px solid black' }}>
                <Card sx={{ display: 'flex', margin: '5px' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image="/cover.png"
                    alt="album cover"
                  />
                  <CardContent>
                    <Typography component="div" variant="h6">
                      HUMBLE
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Kendrick Lamar
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ display: 'flex', margin: '5px' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image="/cover.png"
                    alt="album cover"
                  />
                  <CardContent>
                    <Typography component="div" variant="h6">
                      HUMBLE
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Kendrick Lamar
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </main>
      <BottomNav />
    </div>
  );
}