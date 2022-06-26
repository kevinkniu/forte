import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardActions,
  Collapse, Avatar, IconButton, Typography, Checkbox, Box, Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Carousel from 'react-material-ui-carousel';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ post }) {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;
  const postData = post._document.data.value.mapValue.fields;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    <Card sx={{ mx: 3, my: 1, width: { xs: 325, sm: 500, md: 700 }, maxWidth: 700, display: hidden === true ? 'none' : '' }}>
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
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
          <Box sx={{ width: 300, p: 2 }}>
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
          <Box sx={{ width: 300, p: 2 }}>
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

      <CardContent>
        <Typography variant="body2">
          {postData.message.stringValue}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox icon={<ThumbUpOutlinedIcon />} checkedIcon={<ThumbUpIcon sx={{ color: '#673ab7' }} />} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph variant="body2">
            Comment hardcode test.
          </Typography>
          <Typography paragraph variant="body2">
            Long Comment hardcode test.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Typography>
          <Typography paragraph variant="body2">
            Additional comment hardcode test.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
