import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

export default function SideMenu() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5,
                }}
            >
                <Typography sx={{
                    // flexGrow: 1,
                    // textAlign: 'center',
                    fontWeight: 'bold',
                    lineHeight: 1.675,
                    fontSize: '1.325rem',
                }}> Job Tracker</Typography>
                <Avatar variant="square"
                        src="/logo.svg"
                        sx={{
                            width: 28,
                            height: 28,
                            ml: -2.75,

                        }}/>
            </Box>
            <Divider />
            <MenuContent />
        </Drawer>
    );
}
