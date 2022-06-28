import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardActions, CardContent, CardMedia, Button, Chip, Box, Typography } from '@mui/material';

export default function ExploreCard({ myGenres, user }) {
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;
  const [added, setAdded] = useState(false);
  const userData = user._delegate._document.data.value.mapValue.fields;

  const sendFriendReq = async () => {
    await fetch('/api/users/sendFriendReq', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        type: added,
        targetUserID: userData.id.stringValue,
        myUserID: sessionObj.id,
      }),
    });
    setAdded(!added);
  };

  return (
    <Card sx={{ mx: 3, my: 1, width: 325, maxWidth: 700 }}>
      <CardMedia
        component="img"
        height="300"
        image={userData.profPic.stringValue}
        alt="N/A"
      />
      <CardContent sx={{ pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ my: 0 }}>
            {userData.name.stringValue}
          </Typography>
          <CardActions>
            <Button onClick={() => { sendFriendReq(); }} size="small" sx={{ color: added ? 'text.secondary' : '#673ab7', typography: 'body1' }}>{added ? 'Sent Request' : 'Add Friend'}</Button>
          </CardActions>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
          also likes
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {userData.genres.arrayValue.values.map((genre, number) => {
            let count = 0;
            if (myGenres.includes(genre.stringValue) && count < 3) {
              count += 1;
              return (
                <div key={number}>
                  <Chip label={genre.stringValue} color="primary" sx={{ bgcolor: '#673ab7', mr: 1 }} />
                </div>
              );
            }
            return null;
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
