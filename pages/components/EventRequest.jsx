import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, Button, Box, Grid } from '@mui/material';
import { AppContext } from '../_app';

export default function FriendRequest({ request }) {
  const { currentUser } = useContext(AppContext);
  const [event, setEvent] = useState(null);
  const [hidden, setHidden] = useState(false);

  const initializeRequest = async () => {
    const response = await fetch(`/api/events/${request.stringValue}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = await response.json();
    setEvent(result[0]._delegate._document.data.value.mapValue.fields);
  };

  const handleRequest = async (type) => {
    await fetch('/api/events/handleRequest', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        type,
        myUserID: currentUser.id.stringValue,
        eventID: request.stringValue,
      }),
    });
    setHidden(true);
  };

  useEffect(() => {
    initializeRequest();
  }, []);

  return (
    <div>
      {event && (
        <Card sx={{ boxShadow: 5, width: { xs: 390, sm: 500, md: 700 }, maxWidth: 700, display: hidden === true ? 'none' : '' }}>
          <CardHeader
            avatar={(
              <Avatar src={event.profPic.stringValue} />
            )}
            title={event.userName.stringValue}
            subheader={`At ${event.location.stringValue}`}
          />
          {event.photos.arrayValue.values.length > 0 && (
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Box sx={{ width: 300, px: 2 }}>
                <Image
                  height={10}
                  width={10}
                  layout="responsive"
                  objectFit="contain"
                  src={event.photos.arrayValue.values[0].stringValue}
                  alt="N/A"
                />
              </Box>
            </Grid>
          )}
          <CardContent sx={{ px: 2, py: 1 }}>
            <Typography sx={{ textDecoration: 'underline', fontWeight: 600 }} variant="body2">
              {`happening on ${new Date(event.date.timestampValue.seconds * 1000
                + event.timestamp.timestampValue.nanos / 1000000).toLocaleTimeString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).slice(0, 10)}`}
            </Typography>
            <Typography variant="body1">
              {event.eventName.stringValue}
            </Typography>
            <Typography paragraph variant="body2" sx={{ my: 0, fontWeight: 600, textDecoration: 'underline' }}>
              Details:
            </Typography>
            <Typography paragraph variant="body2" sx={{ my: 0 }}>
              {event.details.stringValue}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
              onClick={() => { handleRequest('attend'); }}
              size="small"
              sx={{ color: '#673ab7', typography: 'body1' }}
            >
              Attend
            </Button>
            <Button
              onClick={() => { handleRequest('delete'); }}
              size="small"
              sx={{ color: '#673ab7', typography: 'body1' }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}
