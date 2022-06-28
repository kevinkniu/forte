import { Card, CardActions, CardContent, CardMedia, Button, Chip, Box, Typography } from '@mui/material';

export default function ExploreCard({ myGenres, user }) {
  const userData = user._delegate._document.data.value.mapValue.fields;

  return (
    <Card sx={{ mx: 3, my: 1, width: { xs: 325, sm: 500, md: 700 }, maxWidth: 700 }}>
      <CardMedia
        component="img"
        height="300"
        image={userData.profPic.stringValue}
        alt="green iguana"
      />
      <CardContent sx={{ pb: 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {userData.name.stringValue}
        </Typography>
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
          })}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Add Friend</Button>
      </CardActions>
    </Card>
  );
}
