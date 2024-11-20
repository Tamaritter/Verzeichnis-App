import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, {ReactElement, useEffect} from 'react';
import {FacultySubjects} from '@/content/subjects';
import {readCookie, setCookie} from '@/cookieManager';

interface SubjectSelectorProps {
  subjects: FacultySubjects;
}

export default function SubjectSelector({subjects}: SubjectSelectorProps) {
  const [subject, setSubject] = React.useState('');
  const tech: ReactElement[] = [];
  const eco: ReactElement[] = [];
  const health: ReactElement[] = [];

  subjects.tech.forEach(subject =>
    tech.push(
      <MenuItem key={subject.tag} value={subject.tag}>
        {subject.de}
      </MenuItem>
    )
  );

  subjects.eco.forEach(subject =>
    eco.push(
      <MenuItem key={subject.tag} value={subject.tag}>
        {subject.de}
      </MenuItem>
    )
  );

  subjects.health.forEach(subject =>
    health.push(
      <MenuItem key={subject.tag} value={subject.tag}>
        {subject.de}
      </MenuItem>
    )
  );

  useEffect(() => {
    readCookie<string>('subject')
      .then(storedSubject => {
        if (storedSubject) {
          setSubject(storedSubject);
        }
      })
      .catch(console.warn);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value as string);
    setCookie('subject', event.target.value as string).catch(console.warn);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Studiengang</InputLabel>
      <Select
        label="Studiengang"
        value={subject}
        onChange={handleChange}
        variant="outlined"
      >
        <ListSubheader>Technik</ListSubheader>
        {tech}
        <ListSubheader>Wirtschaft</ListSubheader>
        {eco}
        <ListSubheader>Gesundheit</ListSubheader>
        {health}
      </Select>
    </FormControl>
  );
}
