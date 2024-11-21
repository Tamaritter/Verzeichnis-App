'use client';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import {
  EventNote as EventNoteIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  SvgIconComponent,
} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Defaults} from '@/appDefaults';
import {FacultySubjects} from '@/content/subjects';
import {readCookie} from '@/cookieManager';

interface IPage {
  name: string;
  path: string;
  icon: SvgIconComponent;
}

const pages: IPage[] = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    name: 'About',
    path: '/about',
    icon: InfoIcon,
  },
  {
    name: 'Select Course',
    path: '/course-selector',
    icon: SearchIcon,
  },
  {
    name: 'Tutorials',
    path: '/tutorials',
    icon: SchoolIcon,
  },
];

interface NavigationProps {
  isMobile?: boolean;
  subjects: FacultySubjects;
}

export default function Navigation({isMobile = false}: NavigationProps) {
  const pathname = usePathname();
  const [course, setCourse] = useState<string | undefined>(undefined);

  useEffect(() => {
    readCookie<string>('course').then(setCourse).catch(console.warn);
  }, []);

  return (
    <Box sx={{width: Defaults.drawerWidth - 1}}>
      {!isMobile ? <Toolbar /> : null}
      <List>
        {pages.map((page, index) => (
          <ListItemButton
            key={index}
            component={Link}
            href={page.path}
            selected={pathname === page.path}
          >
            <ListItemIcon>
              <page.icon />
            </ListItemIcon>

            <ListItemText primary={page.name} />
          </ListItemButton>
        ))}
        <Divider sx={{mt: 5, mb: 5}} />
        <ListItemButton
          component={Link}
          href={
            course
              ? 'https://dhbw.ottercloud.net/course/' + course
              : 'https://dhbw.ottercloud.net'
          }
        >
          <ListItemIcon>
            <EventNoteIcon />
          </ListItemIcon>
          <ListItemText>Schedule</ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
}
