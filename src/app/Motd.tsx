import {Paper, Typography} from "@mui/material";
import {readCookie} from "@/cookieManager";
import motd from "@/content/motd.json";
import {SubjectCategory, subjects} from "@/content/subjects";

export default async function Motd() {

    const subjectString = await readCookie<string>("subject");
    const subject = subjectString ? subjects.get(subjectString) : undefined;
    const subjectCategory = subject ? subject.category : SubjectCategory.DHBW;

    const filteredMotd = motd.filter((entry) => entry.tags.includes(subjectCategory) || entry.tags.includes(SubjectCategory.DHBW));
    if (filteredMotd.length === 0) {
        return null;
    }
    const randomMotd = filteredMotd[Math.floor(Math.random() * filteredMotd.length)];

    return (
        <Paper sx={{p:2}}>
            <Typography variant="h4">
                Wusstest du schon?
            </Typography>
            <Typography>
                {randomMotd.de}
            </Typography>
        </Paper>
    )
}
