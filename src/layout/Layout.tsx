import {Outlet} from 'react-router-dom'
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid2';
import NavBar from "../components/NavBar/NavBar.tsx";

function Layout() {
    return (<>
            <CssBaseline enableColorScheme/>
            <Grid container spacing={1} rowSpacing={2}
                  columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <NavBar/>
                <Outlet/>
            </Grid>
        </>)
}

export default Layout;