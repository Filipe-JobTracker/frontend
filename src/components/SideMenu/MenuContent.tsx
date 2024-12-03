import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';

import RouterButton from "../RouterButton.tsx";
import NewApplicationModal from "../ApplicationModal/ApplicationModal.tsx";
import ImportCSV from "../ImportCSV/ImportCSV.tsx";
import Divider from "@mui/material/Divider";

const mainListItems = [
    { text: 'Analytics', icon: <AnalyticsRoundedIcon />, url: '/dashboard'},
    { text: 'Applications', icon: <AssignmentIndRoundedIcon />, url: '/applications'},
    { text: 'Companies', icon: <AccountBalanceRoundedIcon /> , url: '/companies'},
];

// const newApplicationButton = { text: 'New', color: "success" };

const secondaryListItems = [
    { text: 'API Docs', icon: <TextSnippetRoundedIcon />, url: "http://localhost:3000/docs" },
    { text: 'Github', icon: <BugReportRoundedIcon />, url: "https://github.com/filz0r" },
];

export default function MenuContent() {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                <NewApplicationModal />
                <ImportCSV />
                <Divider sx={{
                    mt: 0.75,
                    mb: 1.25,
                }}/>
                {mainListItems.map((item, index) => (
                    // @ts-ignore
                    <RouterButton key={`menu-item-${index}`} url={item.url} text={item.text} icon={item.icon} sx={{
                        my: 1,
                        width: '100%',
                    }}/>
                ))}

            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton href={item.url}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
