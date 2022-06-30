import { useState, useEffect, useContext } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Box, Typography } from '@mui/material';
import { AppContext } from '../_app';

export default function FriendRequest({ request }) {
  const { currentUser } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [hidden, setHidden] = useState(false);

  const initializeRequest = async () => {
    const response = await fetch(`/api/users/${request.stringValue}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = await response.json();
    setUser(result[0]._delegate._document.data.value.mapValue.fields);
  };

  const handleRequest = async (type) => {
    await fetch('/api/users/handleRequest', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        type,
        myUserID: currentUser.id.stringValue,
        targetUserID: user.id.stringValue,
      }),
    });
    setHidden(true);
  };

  useEffect(() => {
    initializeRequest();
  }, []);

  return (
    <div>
      {user && (
        <Card sx={{ mx: 3, my: 1, width: 325, maxWidth: 700, display: hidden === true ? 'none' : '' }}>
          <CardMedia
            component="img"
            height="300"
            image={user.profPic.stringValue}
            alt="N/A"
          />
          <CardContent sx={{ pb: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography gutterBottom component="div" sx={{ fontWeight: 600, fontSize: 18, m: 0, p: 0 }}>
                {user.name.stringValue}
              </Typography>
              <CardActions sx={{ width: 150 }}>
                <Button
                  onClick={() => { handleRequest('accept'); }}
                  size="small"
                  sx={{ color: '#673ab7', width: 3 }}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => { handleRequest('delete'); }}
                  size="small"
                  sx={{ color: '#673ab7', width: 2, px: 0 }}
                >
                  Delete
                </Button>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
