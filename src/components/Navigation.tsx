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
import {Defaults} from '@/appDefaults';
import {FacultySubjects} from '@/content/subjects';
import {useCookies} from 'react-cookie';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';

interface IPage {
  name: string;
  path: string;
  icon: SvgIconComponent;
}

const pages: IPage[] = [
  {
    name: 'home',
    path: '/',
    icon: HomeIcon,
  },
  {
    name: 'about',
    path: '/about',
    icon: InfoIcon,
  },
  {
    name: 'selectCourse',
    path: '/course-selector',
    icon: SearchIcon,
  },
  {
    name: 'tutorials',
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
  const [cookies] = useCookies<'course', {course?: string}>(['course']);
  const t = useTranslations('Navigation');
  const [course, setCourse] = useState<string | undefined>();

  useEffect(() => {
    if (cookies.course) setCourse(cookies.course);
  }, [cookies.course]);

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

            <ListItemText primary={t(page.name)} />
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
          <ListItemText primary={t('schedule')} />
        </ListItemButton>
      </List>
    </Box>
  );
}
