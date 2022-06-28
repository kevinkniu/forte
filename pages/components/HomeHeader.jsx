import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Grid } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

export default function HomeHeader() {
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: '#673ab7' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, px: 1 }}>
            Explore
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, px: 1 }}>
            Forum
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, px: 1 }}>
            Events
          </Typography>
          <Grid container justifyContent="flex-end">
            <ChatIcon color="inherit" sx={{ mx: 1 }} />
            <Badge badgeContent={3} color="primary" sx={{ mx: 1 }}>
              <NotificationsIcon color="action" />
            </Badge>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
