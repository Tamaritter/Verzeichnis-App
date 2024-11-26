import {
  AppBar,
  Box,
  Container,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import {Adb as AdbIcon} from '@mui/icons-material';
import MobileNavDrawer from '@/components/MobileNavDrawer';
import Navigation from '@/components/Navigation';
import {Defaults} from '@/appDefaults';
import {Faculty, FacultySubjects, Subject} from '@/content/subjects';

type SubjectJson = [
  {
    name: string;
    faculty: string;
    degreeName: string;
  },
];
export default async function AppHeader() {
  async function getSubjects(): Promise<FacultySubjects> {
    'use server';
    const response = await fetch(
      'https://api.dhbw.app/courses/MA/mapped/extended'
    );
    const data: {[key: string]: {[subj: string]: never}} =
      await response.json();
    const subjects: Subject[] = [];
    for (const value of Object.values(data)) {
      for (const [subCategoryKey, subCategory] of Object.entries(value)) {
        if (subCategoryKey === 'size') continue;
        const classes = subCategory as SubjectJson;

        subjects.push({
          tag: classes[0].name.replace(/MA-/g, '').replace(/\d{2}.*/g, ''),
          de: classes[0].degreeName,
          en: classes[0].degreeName,
          faculty: classes[0].faculty as Faculty,
          category: classes[0].faculty,
        });
      }
    }

    const technik = subjects.filter(subject => subject.faculty === 'Technik');
    const economy = subjects.filter(
      subject => subject.faculty === 'Wirtschaft'
    );
    const health = subjects.filter(subject => subject.faculty === 'Gesundheit');
    return {tech: technik, eco: economy, health: health};
  }

  const subjects = await getSubjects();

  return (
    <>
      <AppBar position="fixed" sx={{zIndex: {sm: 1300}}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{flexGrow: 1, display: 'flex'}}>
              <MobileNavDrawer subjects={subjects} />
              <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
              <Typography
                variant="h4"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: 'var(--font-roboto)',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {Defaults.appName}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div id="navigation-drawer-anchor" />
      <Box
        sx={{
          display: {xs: 'none', sm: 'block'},
          width: {sm: Defaults.drawerWidth},
          flexShrink: {sm: 0},
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: Defaults.drawerWidth,
            },
          }}
          open
        >
          <Navigation subjects={subjects} />
        </Drawer>
      </Box>
    </>
  );
}
