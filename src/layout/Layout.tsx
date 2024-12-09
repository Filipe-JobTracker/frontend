import {Outlet} from 'react-router-dom'
import SideMenu from "../components/SideMenu/SideMenu.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';

function Layout() {
    return (
        <>
            <CssBaseline enableColorScheme/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
            }}>
                <Grid container spacing={1} rowSpacing={2}
                      columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    <Grid size="auto" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexGrow: 1,
                    }}>
                        <SideMenu/>
                    </Grid>
                    <Grid display="flex" justifyContent="center"
                          alignItems="center" size="auto">
                        <Outlet/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Layout;