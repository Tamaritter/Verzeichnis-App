'use client';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {Link} from '@/i18n/routing';
import {ReactNode} from 'react';

export function LinkButton({
  children,
  text,
  href,
}: {
  text: string;
  href: string;
  children?: ReactNode;
}) {
  return (
    <ListItem>
      <ListItemButton component={Link} href={href}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
