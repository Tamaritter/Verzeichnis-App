'use server';
import Grid from '@mui/material/Grid2';
import {Paper, Typography} from '@mui/material';
import {Defaults} from '@/appDefaults';
import Motd from '@/app/Motd';

export default async function Home() {
  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 0, sm: 3}} />
      <Grid size={{xs: 12, sm: 6}}>
        <Paper sx={{p: 2}}>
          <Typography variant="h3" gutterBottom>
            Willkommen bei der {Defaults.appName} App
          </Typography>
          <br />
        </Paper>
      </Grid>
      <Grid size={{xs: 0, sm: 3}} />
      <Grid size={{xs: 0, sm: 3}} />
      <Grid size={{xs: 12, sm: 6}}>
        <Motd />
      </Grid>
      <Grid size={{xs: 0, sm: 3}} />
    </Grid>
  );
}
