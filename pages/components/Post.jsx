import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardActions,
  Avatar, IconButton, Typography, Checkbox, Box, Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Carousel from 'react-material-ui-carousel';

export default function Post({ post }) {
  const [hidden, setHidden] = useState(false);
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;
  const postData = post._document.data.value.mapValue.fields;

  const onDelete = () => {
    if (postData.userID.stringValue !== sessionObj.id) {
      return;
    }
    const deletePost = async () => {
      await fetch(`/api/posts/${post._key.path.segments[6]}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
    };
    deletePost();
    setHidden(true);
  };

  return (
    <Card sx={{ boxShadow: 5, width: { xs: 390, sm: 500, md: 700 }, maxWidth: 700, display: hidden === true ? 'none' : '' }}>
      <CardHeader
        avatar={(
          <Avatar src={postData.profPic.stringValue} />
        )}
        action={(
          <IconButton aria-label="settings" onClick={() => { onDelete(); }}>
            <HighlightOffIcon sx={{ display: postData.userID.stringValue === sessionObj.id ? '' : 'none' }} />
          </IconButton>
        )}
        title={postData.name.stringValue}
        subheader={
          new Date(postData.timestamp.timestampValue.seconds * 1000
          + postData.timestamp.timestampValue.nanos / 1000000).toLocaleTimeString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
        }
      />
      {postData.photos.arrayValue.values.length === 1 && (
        <Grid container spacing={0} direction="column" alignItems="flex-start" justifyContent="center">
          <Box sx={{ width: 300 }}>
            <Image
              height={10}
              width={10}
              layout="responsive"
              objectFit="contain"
              src={postData.photos.arrayValue.values[0].stringValue}
              alt="N/A"
            />
          </Box>
        </Grid>
      )}
      {postData.photos.arrayValue.values.length > 1 && (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
          <Box sx={{ width: 300 }}>
            <Carousel
              autoPlay={false}
              swipe
              cycleNavigation={false}
              animation="slide"
            >
              {postData.photos.arrayValue.values.map((photo, number) => (
                <div key={number}>
                  <Image
                    height={10}
                    width={10}
                    layout="responsive"
                    objectFit="contain"
                    src={photo.stringValue}
                    alt="N/A"
                  />
                </div>
              ))}
            </Carousel>
          </Box>
        </Grid>
      )}

      <CardContent sx={{ px: 3, py: 1 }}>
        <Typography variant="body2">
          {postData.message.stringValue}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ pt: 0, pb: 1 }}>
        <IconButton aria-label="add to favorites">
          <Checkbox icon={<ThumbUpOutlinedIcon />} checkedIcon={<ThumbUpIcon sx={{ color: '#673ab7' }} />} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
