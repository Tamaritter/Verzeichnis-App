"use client";
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import {Home as HomeIcon, Info as InfoIcon, SvgIconComponent} from "@mui/icons-material";
import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Defaults} from "@/appDefaults";
import SubjectSelector from "@/components/SubjectSelector";

interface IPage {
    name: string;
    path: string;
    icon: SvgIconComponent
}

const pages: IPage[] = [{
    name: 'Home',
    path: '/',
    icon: HomeIcon
}, {
    name: 'About',
    path: '/about',
    icon: InfoIcon
}];

export default function Navigation({isMobile = false}: { isMobile?: boolean }) {

    const pathname = usePathname();

    return (
        <Box sx={{width: Defaults.drawerWidth-1}}>
            {!isMobile ? <Toolbar/> : null}
            <List>
                {pages.map((page, index) => (
                    <ListItemButton key={index} component={Link} href={page.path}
                                    selected={pathname === page.path}>
                        <ListItemIcon>
                            <page.icon/>
                        </ListItemIcon>

                        <ListItemText primary={page.name}/>
                    </ListItemButton>
                ))}
                <Divider sx={{mt: 5, mb: 5}}/>
                <ListItem>
                    <SubjectSelector/>
                </ListItem>
            </List>
        </Box>
    )
}
