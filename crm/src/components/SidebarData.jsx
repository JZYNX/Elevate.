import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';
import NotesIcon from '@mui/icons-material/Notes';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/dashboard"
    },
    {
        title: "Calendar",
        icon: <EventIcon />,
        link: "/calendar"
    },
    {
        title: "Connections",
        icon: <PeopleIcon />,
        link: "/connections"
    },
    {
        title: "Messages",
        icon: <MessageIcon />,
        link: "/message"
    },
    {
        title: "Profile",
        icon: <DashboardIcon />,
        link: "/profile"
    },
]
