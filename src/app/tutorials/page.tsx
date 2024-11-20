import {Paper} from '@mui/material';
import {getTutorials} from '@/app/tutorials/util';

export default async function Page() {
  const tutorials = getTutorials();

  return (
    <>
      <Paper sx={{p: 2}}>
        <h1>Tutorials</h1>
        <ul>
          {tutorials.map(tutorial => (
            <li key={tutorial.slug}>
              <a href={`/tutorials/${tutorial.slug}`}>{tutorial.slug}</a>
            </li>
          ))}
        </ul>
      </Paper>
    </>
  );
}
