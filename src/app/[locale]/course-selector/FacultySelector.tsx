'use client';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React, {ReactElement, useEffect} from 'react';
import {Faculty} from '@/lib/CourseTypes';
import {useRouter} from '@/i18n/routing';
import {useParams} from 'next/navigation';
import {useTranslations} from 'next-intl';

export default function FacultySelector() {
  const params = useParams<{course?: string[]}>();
  const [faculty, setFaculty] = React.useState('');
  const t = useTranslations('CourseSelector');

  const router = useRouter();

  useEffect(() => {
    const facultyFromRoute = params.course?.[0] as Faculty;
    if (facultyFromRoute) {
      setFaculty(facultyFromRoute);
    }
  }, [params.course]);

  const handleChange = (event: SelectChangeEvent) => {
    setFaculty(event.target.value);
    router.push(`/course-selector/${event.target.value}`);
  };

  const items: ReactElement[] = [];
  for (const facultyName in Faculty) {
    items.push(
      <MenuItem key={facultyName} value={facultyName}>
        {t(facultyName.toLowerCase())}
      </MenuItem>
    );
  }

  return (
    <Select
      label={t('faculty')}
      value={faculty}
      onChange={handleChange}
      variant="outlined"
    >
      {items}
    </Select>
  );
}
