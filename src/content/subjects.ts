export enum SubjectCategory {
    DHBW = "dhbw",
    Informatik = "informatik",
    Wirtschaft = "wirtschaft",
    Wirtschaftsinformatik = "wirtschaftsinformatik",
}

export interface Subject {
    tag: string;
    de: string;
    en: string;
    faculty: Faculty;
    category: string;
}

export type Faculty = "Technik" | "Wirtschaft" | "Gesundheit";
export type FacultySubjects = { tech: Subject[], eco: Subject[], health: Subject[] };

interface MOTD {
    de: string;
    en: string;
    tags: string[];
    url: string;
}

export function filterMotd(subject: SubjectCategory, motd: MOTD[]): MOTD[] {
    switch (subject) {
        case SubjectCategory.Informatik:
            return motd.filter((entry) => entry.tags.includes(SubjectCategory.Informatik));
        case SubjectCategory.Wirtschaft:
            return motd.filter((entry) => entry.tags.includes(SubjectCategory.Wirtschaft));
        case SubjectCategory.Wirtschaftsinformatik:
            return motd.filter((entry) => entry.tags.includes(SubjectCategory.Wirtschaft) || entry.tags.includes(SubjectCategory.Informatik));
        default:
            return motd.filter((entry) => entry.tags.includes(SubjectCategory.DHBW));
    }
}
