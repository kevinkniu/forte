import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardActions,
  Collapse, Avatar, IconButton, Typography, Checkbox } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
    <Card sx={{ mx: 3, my: 1, width: 350, maxWidth: 700, display: hidden === true ? 'none' : '' }}>
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
          + postData.timestamp.timestampValue.nanos / 1000000).toLocaleString()
        }
      />
      {postData.photos.arrayValue.values.length > 0 && (
        <Image
          height={200}
          width={350}
          objectFit="contain"
          src={postData.photos.arrayValue.values[0].stringValue}
          alt="Placeholder"
        />
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
