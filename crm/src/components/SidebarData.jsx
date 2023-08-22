import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';
import NotesIcon from '@mui/icons-material/Notes';
import PersonIcon from '@mui/icons-material/Person';

export const SidebarData = [
    {
        title: "DASHBOARD",
        icon: <DashboardIcon />,
        link: "/"
    },
    {
        title: "CALENDAR",
        icon: <EventIcon />,
        link: "/calendar"
    },
    {
        title: "CONNECTIONS",
        icon: <PeopleIcon />,
        link: "/connections"
    },
    {
        title: "MESSAGES",
        icon: <MessageIcon />,
        link: "/message"
    },
    {
        title: "NOTES",
        icon: <NotesIcon />,
        link: "/notes"
    },
    {
        title: "PROFILE",
        icon: <PersonIcon />,
        link: "/profile"
    }
]
