import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DataCards from "./DataCards"
import BasicPie from "./PieChart.tsx";

// todo: add reactivity to the components
export default function Dashboard() {


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
                <DataCards/>
                <Box>
                    <BasicPie/>
                </Box>
            </Box>
        </>);
}