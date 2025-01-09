import { useState } from "react";

import RouterButton from "../RouterButton.tsx";
import {
    Stack,
    Toolbar,
    Typography,
    Container,
    AppBar,
    Button,
    Drawer,
    Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

const pages = [
    { name: "Statistics", id: "products", url: '/', icon: <AnalyticsRoundedIcon />},
    { name: "Applications", id: "services", url: '/applications' , icon: <AssignmentIndRoundedIcon />},
    { name: "Companies", id: "about" , url: '/companies', icon: <AccountBalanceRoundedIcon />},
];

const Nav = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = newOpen => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <Button
                variant="text"
                onClick={toggleDrawer(true)}
                sx={{ color: "white", display: { xs: "flex", sm: "none" } }}
            >
                <MenuIcon />
            </Button>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor="right"
                sx={{
                    display: { xs: "inherit", sm: "none" },
                    "& .MuiDrawer-paper": {
                        height: "100%",
                        width: "100%",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                    }}
                >
                    <Button onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </Button>
                </Box>
                <NavList />
            </Drawer>
            <NavList
                sx={{
                    display: { xs: "none", sm: "inherit" },
                }}
            />
        </>
    );
};

const NavList = ({ ...props }) => {
    return (
        <Stack
            overflow="auto"
            direction={{ xs: "column", sm: "row" }}
            gap={3}
            width={{ xs: "100%", sm: "initial" }}
            textAlign={{ xs: "center", sm: "initial" }}
            fontSize={{ xs: "22px", sm: "initial" }}
            {...props}
        >
            {pages.map((item, index) => (
                <RouterButton key={`menu-item-${index}`} url={item.url} text={item.name} icon={item.icon} color="text.primary"/>
            ))}
        </Stack>
    );
};

const NavBar = () => {
    return (
        <AppBar>
            <Container sx={{
                mx: 0,
                minWidth: '100%',
            }}>
                <Toolbar>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2,
                            pt: 1,
                        }}>
                            <Avatar variant="square"
                                    src="/logo.svg"
                                    sx={{ mb: 2 }}
                            />
                            <Typography variant='h5' sx={{
                                fontWeight: 'bold',
                                mt: 1.5,
                            }}>
                                Job Tracker
                            </Typography>
                        </Box>

                        <Nav />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;