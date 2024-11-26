import Grid from '@mui/material/Grid2';
import {Paper, Typography} from '@mui/material';
import {Defaults} from '@/appDefaults';
import Motd from '@/app/[locale]/Motd';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export default async function Home({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = await getTranslations('HomePage');

  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 12, sm: 9}}>
        <Paper sx={{p: 2}}>
          <Typography variant="h3" gutterBottom>
            {t('title', {appName: Defaults.appName})}
          </Typography>
          <br />
        </Paper>
      </Grid>
      <Grid size={{xs: 12, sm: 3}}>
        <Motd locale={locale} />
      </Grid>
    </Grid>
  );
}
