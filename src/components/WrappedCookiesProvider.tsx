'use client';
import {CookiesProvider} from 'react-cookie';
import {CookieSetOptions} from 'universal-cookie';
import {ReactNode} from 'react';

export default function WrappedCookiesProvider({
  children,
  defaultSetOptions,
}: {
  children: ReactNode;
  defaultSetOptions: CookieSetOptions;
}) {
  return (
    <CookiesProvider defaultSetOptions={defaultSetOptions}>
      {children}
    </CookiesProvider>
  );
}
