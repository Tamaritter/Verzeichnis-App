import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React, {ReactElement, useEffect} from "react";
import {subjects} from "@/content/subjects";
import {createCookie, readCookie} from "@/cookieManager";

export default function SubjectSelector() {
    const [subject, setSubject] = React.useState('');

    useEffect(() => {
       readCookie<string>("subject").then((storedSubject) => {
            if (storedSubject) {
                setSubject(storedSubject);
            }
        }).catch(console.warn);
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        setSubject(event.target.value as string);
        createCookie('subject', event.target.value as string).catch(console.warn);
    };

    const items: ReactElement[] = [];

    subjects.forEach((subject, index) => (
        items.push(<MenuItem key={index} value={index}>{subject.de}</MenuItem>)
    ))

    return (
        <FormControl fullWidth>
            <InputLabel>Studiengang</InputLabel>
            <Select
                label="Studiengang"
                value={subject}
                onChange={handleChange}
                variant="outlined">
                {items}
            </Select>
        </FormControl>
    );
}
