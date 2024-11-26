import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import React, {ReactNode} from 'react';
import {routing} from '@/i18n/routing';
import {Box, CssBaseline, Toolbar} from '@mui/material';
import AppHeader from '@/app/[locale]/AppHeader';
import {Defaults} from '@/appDefaults';

export function generateStaticParams() {
  return routing.locales.map(locale => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppHeader />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: {sm: `calc(100% - ${Defaults.drawerWidth}px)`},
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </NextIntlClientProvider>
  );
}
