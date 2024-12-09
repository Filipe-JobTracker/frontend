import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DataCards from "./DataCards"
import BasicPie from "./PieChart.tsx";
import RecentApplicationsTable from "./RecentApplicationsTable.tsx";
import useMediaQuery from '@mui/material/useMediaQuery';
// todo: add reactivity to the components
export default function Dashboard() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (<>
        <Box sx={{
            my: 1,
            bgcolor: 'background.paper',
            minWidth: '75vw',
            height: '80vh',

        }}>
            <Typography variant="h3" gutterBottom sx={{
                mt: -5, mb: 6, textAlign: 'center',
            }}>
                Statistics
            </Typography>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignContent: 'center',
                justifyContent: 'space-evenly',
                flexDirection: {xs: 'column-reverse', sm: 'row'}
            }}>
                {!isMobile && <RecentApplicationsTable/>}
                <Box>
                    <DataCards/>
                    <BasicPie/>
                </Box>
            </Box>
        </Box>
    </>);
}