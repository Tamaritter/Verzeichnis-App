'use server';
import {List, Paper, Typography} from '@mui/material';
import {getTutorials} from '@/app/[locale]/tutorials/util';
import {LinkButton} from '@/components/ListItemLink';
import {InfoOutlined} from '@mui/icons-material';

export default async function Page() {
  const tutorials = getTutorials();

  return (
    <>
      <Paper sx={{p: 2}}>
        <Typography variant="h1">Tutorials</Typography>
        <List>
          {tutorials.map(tutorial => (
            <LinkButton
              key={tutorial.slug}
              href={`tutorials/${tutorial.slug}`}
              text={tutorial.slug}
            >
              <InfoOutlined />
            </LinkButton>
          ))}
        </List>
      </Paper>
    </>
  );
}
