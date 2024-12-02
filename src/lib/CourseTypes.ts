export interface Subject {
  tag: string;
  name: string;
  faculty: Faculty;
}

export enum Faculty {
  Technik = 'technik',
  Wirtschaft = 'wirtschaft',
  Gesundheit = 'gesundheit',
}

export type SubjectJson = SubjectData[];
export type SubjectData = {
  name: string;
  faculty: string;
  degreeName: string;
};
