export enum SubjectCategory {
  DHBW = 'dhbw',
  Informatik = 'informatik',
  Wirtschaft = 'wirtschaft',
  Wirtschaftsinformatik = 'wirtschaftsinformatik',
}

export interface Subject {
  tag: string;
  de: string;
  en: string;
  faculty: Faculty;
  category: string;
}

export type Faculty = 'Technik' | 'Wirtschaft' | 'Gesundheit';
export type FacultySubjects = {
  tech: Subject[];
  eco: Subject[];
  health: Subject[];
};

interface MOTD {
  de: string;
  en: string;
  tags: string[];
  url: string;
}

export function filterMotd(
  course: string,
  motd: MOTD[],
  filterDefault: boolean = false
): MOTD[] {
  const lowerCaseCourse = course.toLowerCase();
  if (filterDefault) {
    return motd.filter(
      entry =>
        entry.tags.includes(lowerCaseCourse) || entry.tags.includes('dhbw')
    );
  }
  return motd.filter(entry => entry.tags.includes(lowerCaseCourse));
}
