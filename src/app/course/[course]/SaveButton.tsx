'use client';
import {setCookie} from '@/cookieManager';
import {LoadingButton} from '@mui/lab';
import {useState} from 'react';

export default function SaveButton({course}: {course: string}) {
  const [loading, setLoading] = useState(false);
  const saveCourse = (course: string) => () => {
    setLoading(true);
    setCookie<string>('course', course)
      .then(() => setLoading(false))
      .catch(console.error);
  };

  return (
    <LoadingButton loading={loading} onClick={saveCourse(course)}>
      Save as my Course
    </LoadingButton>
  );
}
