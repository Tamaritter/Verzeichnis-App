'use server';
import {Box, Button, Card, CardContent, Chip, Typography} from '@mui/material';
import motd from '@/content/motd.json';
import {filterMotd} from '@/content/subjects';
import {readCookie} from '@/cookieManager';
import {getCourse} from '@/components/courseUtil';
import Link from 'next/link';

export default async function Motd() {
  const courseCookie = await readCookie<string>('course');
  const course = courseCookie ? await getCourse(courseCookie) : undefined;
  const filter = course ? course.degree.abbreviation : 'dhbw';

  const filteredMotd = filterMotd(filter, motd, true);
  if (filteredMotd.length === 0) {
    return null;
  }
  const randomMotd =
    filteredMotd[Math.floor(Math.random() * filteredMotd.length)];

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          mx: 'auto',
          p: 2,
          backgroundColor: 'primary.light',
          color: 'primary.contrastText',
          boxShadow: 4,
          borderRadius: 3,
          position: 'relative', // Ensures absolute elements are positioned relative to the card
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              textAlign: 'center',
              color: 'secondary.main',
            }}
          >
            Did you know?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            {randomMotd.en}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {randomMotd.url.length > 0 && (
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                href={randomMotd.url}
                target={'_blank'}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Read more
              </Button>
            )}
          </Box>
        </CardContent>
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {randomMotd.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                backgroundColor: 'secondary.light',
                color: 'secondary.contrastText',
                fontSize: 10,
              }}
            />
          ))}
        </Box>
      </Card>
    </>
  );
}
