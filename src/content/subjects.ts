export enum SubjectCategory {
    DHBW = "dhbw",
    Informatik = "informatik",
    Wirtschaft = "wirtschaft",
}

interface Subject {
    de: string;
    en: string;
    category: SubjectCategory;
}

export const subjects: Map<string, Subject> = new Map([
    ["ai", {de: "Angewandte Informatik", en: "Applied Computer Science", category: SubjectCategory.Informatik}],
    ["cs", {de: "Cyber Security", en: "Cyber Security", category: SubjectCategory.Informatik}],
    ["it", {de: "Informationstechnik", en: "Information Technology", category: SubjectCategory.Informatik}],
]);
