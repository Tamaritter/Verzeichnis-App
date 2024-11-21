'use server';
import {Paper, Typography} from '@mui/material';
import {Course, getCourse} from '@/components/courseUtil';
import SaveButton from '@/app/course/[course]/SaveButton';

export default async function CoursePage({
  params,
}: {
  params: Promise<{course: string}>;
}) {
  const {course} = await params;

  const jsonData: Course = await getCourse(course);

  return (
    <Paper sx={{p: 2}}>
      <Typography variant="h2">{jsonData.name}</Typography>
      <Typography variant="h3">Faculty: {jsonData.degree.faculty}</Typography>
      <SaveButton course={course} />
    </Paper>
  );
}
