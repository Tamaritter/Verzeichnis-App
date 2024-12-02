'use client';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React, {ReactElement, useEffect} from 'react';
import {Faculty, Subject} from '@/lib/CourseTypes';
import {useRouter} from '@/i18n/routing';
import {useParams} from 'next/navigation';

interface FacultySelectorProps {
  subjects?: Subject[];
  faculty?: Faculty;
}

export default function SubjectSelector({
  subjects,
  faculty,
}: FacultySelectorProps) {
  const params = useParams<{course?: string[]}>();
  const [subject, setSubject] = React.useState('');
  const router = useRouter();

  useEffect(() => {
    const subjectFromRoute = params.course?.[1];
    if (subject.length === 0 && subjectFromRoute) {
      setSubject(subjectFromRoute);
    }
  }, [params.course, subject]);

  const handleChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value);
    router.push(`/course-selector/${faculty}/${event.target.value}`);
  };

  const items: ReactElement[] = [];
  if (faculty && subjects) {
    subjects.forEach(subject => {
      items.push(
        <MenuItem key={subject.tag} value={subject.tag}>
          {subject.name}
        </MenuItem>
      );
    });
  }

  return (
    <Select
      label="Studiengang"
      value={subject}
      onChange={handleChange}
      variant="outlined"
      disabled={!subjects}
    >
      {items}
    </Select>
  );
}
