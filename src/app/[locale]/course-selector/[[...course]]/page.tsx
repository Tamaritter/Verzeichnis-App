'use server';

import Grid from '@mui/material/Grid2';
import {
  Divider,
  FormControl,
  InputLabel,
  List,
  Paper,
  Typography,
} from '@mui/material';
import {School as SchoolIcon} from '@mui/icons-material';
import FacultySelector from '@/app/[locale]/course-selector/FacultySelector';
import React, {cache} from 'react';
import {Faculty, Subject, SubjectData, SubjectJson} from '@/lib/CourseTypes';
import SubjectSelector from '../SubjectSelector';
import YearSelector from '@/app/[locale]/course-selector/YearSelector';
import {ExtendedDataFormat, getSubjects} from '@/components/courseUtil';
import {getTranslations} from 'next-intl/server';
import {LinkButton} from '@/components/ListItemLink';

const cachedProcessSubjects = cache(processSubjects);
const cachedGetYears = cache(getYears);
const cachedGetClasses = cache(getClasses);

function processSubjects(data: ExtendedDataFormat, faculty: Faculty) {
  const subjects: Subject[] = [];
  console.log(faculty);
  for (const value of Object.values(data)) {
    for (const [subCategoryKey, subCategory] of Object.entries(value)) {
      if (subCategoryKey === 'size') continue;
      const classes = subCategory as SubjectJson;
      if (classes[0].faculty !== faculty) continue;

      subjects.push({
        tag: classes[0].name.replace(/MA-/g, '').replace(/\d{2}.*/g, ''),
        name: classes[0].degreeName,
        faculty: faculty as Faculty,
      });
    }
  }
  return subjects;
}

function getYears(data: ExtendedDataFormat, faculty: Faculty, subject: string) {
  const years: number[] = [];
  for (const value of Object.values(data)) {
    for (const [subCategoryKey, subCategory] of Object.entries(value)) {
      if (subCategoryKey === 'size') continue;
      const classes = subCategory as SubjectJson;
      if (classes[0].faculty !== faculty) continue;

      classes.forEach(cls => {
        if (cls.name.replace(/MA-/g, '').replace(/\d{2}.*/g, '') !== subject)
          return;
        const yearString = cls.name.match(/\d{2}/g);
        if (!yearString) return;
        const year = Number.parseInt(yearString[0]);
        if (!years.includes(year)) {
          years.push(year);
        }
      });
    }
  }
  return years.sort();
}

function getClasses(
  data: ExtendedDataFormat,
  faculty: Faculty,
  subject: string,
  year: string
) {
  const classes: SubjectData[] = [];
  for (const value of Object.values(data)) {
    for (const [subCategoryKey, subCategory] of Object.entries(value)) {
      if (subCategoryKey === 'size') continue;
      const subCategories = subCategory as SubjectJson;
      if (subCategories[0].faculty !== faculty) continue;

      subCategories.forEach(cls => {
        const yearString = cls.name.match(/\d{2}/g);
        if (!yearString) return;
        const yearComp = yearString[0];
        if (
          cls.name.replace(/MA-/g, '').replace(/\d{2}.*/g, '') === subject &&
          yearComp === year
        ) {
          classes.push(cls);
        }
      });
    }
  }
  return classes;
}

export default async function CourseSelector({
  params,
}: {
  params: Promise<{course?: string[]}>;
}) {
  const {course} = await params;
  const faculty: Faculty | undefined = course?.[0] as Faculty;
  const subject: string | undefined = course?.[1];
  const year: string | undefined = course?.[2];
  console.log(course);

  let years: number[] = [];
  let subjects: Subject[] | undefined;
  let classes: SubjectData[] = [];

  const t = await getTranslations('CourseSelector');

  if (faculty) {
    const data = await getSubjects();
    subjects = cachedProcessSubjects(data, faculty);
    console.log(subjects);
    if (subject) {
      years = cachedGetYears(data, faculty, subject);
      if (year) {
        classes = cachedGetClasses(data, faculty, subject, year);
      }
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 0, sm: 3}} />
      <Grid size={{xs: 12, sm: 6}}>
        <Paper sx={{p: 2}}>
          <Typography variant="h3" gutterBottom>
            Wähle deinen Studiengang
          </Typography>
          <br />
          <FormControl fullWidth>
            <InputLabel>{t('faculty')}</InputLabel>
            <FacultySelector />
          </FormControl>
          <br />
          <Divider />
          <FormControl fullWidth>
            <InputLabel>{t('subject')}</InputLabel>
            <SubjectSelector subjects={subjects} faculty={faculty} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>{t('year')}</InputLabel>
            <YearSelector faculty={faculty} years={years} />
          </FormControl>
        </Paper>
      </Grid>
      <Grid size={{xs: 0, sm: 3}} />
      {classes.length > 0 ? (
        <>
          <Grid size={{xs: 0, sm: 2}} />
          <Grid size={{xs: 12, sm: 8}}>
            <Paper sx={{p: 2}}>
              <List>
                {classes.map(cls => (
                  <LinkButton
                    key={cls.name}
                    href={`/course/${cls.name}`}
                    text={cls.name.replace(/MA-/g, '')}
                  >
                    <SchoolIcon />
                  </LinkButton>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid size={{xs: 0, sm: 2}} />
        </>
      ) : null}
    </Grid>
  );
}
