'use server';
import {Paper, Typography} from '@mui/material';
import motd from '@/content/motd.json';
import {filterMotd, SubjectCategory} from '@/content/subjects';
import {readCookie} from '@/cookieManager';

export default async function Motd() {
  const subjectString = await readCookie<string>('subject');

  const filteredMotd = filterMotd(SubjectCategory.DHBW, motd);
  if (filteredMotd.length === 0) {
    return null;
  }
  const randomMotd =
    filteredMotd[Math.floor(Math.random() * filteredMotd.length)];

  return (
    <Paper sx={{p: 2}}>
      <Typography variant="h4">Wusstest du schon?</Typography>
      <Typography>{randomMotd.de}</Typography>
    </Paper>
  );
}
