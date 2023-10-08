import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';
import NotesIcon from '@mui/icons-material/Notes';

export const SidebarData = (userName) => [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: `/dashboard?username=${userName}`
    },
    {
        title: "Calendar",
        icon: <EventIcon />,
        link: `/calendar?username=${userName}`
    },
    {
        title: "Connections",
        icon: <PeopleIcon />,
        link: `/connections?username=${userName}`
    },
    {
        title: "Messages",
        icon: <MessageIcon />,
        link: `/message?username=${userName}`
    }
]
