import { Card, CardActions, CardContent, CardMedia, Button, Chip, Box, Typography } from '@mui/material';

export default function ExploreCard({ myGenres, user }) {
  const userData = user._delegate._document.data.value.mapValue.fields;

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
            <Button size="small" sx={{ color: '#673ab7', typography: 'body1' }}>Add Friend</Button>
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
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
