import Typography from "@mui/material/Typography";
import {useGlobalState} from "../../AppContext.tsx";
import ApplicationTable from "./ApplicationTable.tsx";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";


export default function Applications() {
    const {applications, companies} = useGlobalState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [applications, companies]);

    if (loading) {
        return (<Box sx={{
            my: 1, bgcolor: 'background.paper', minWidth: '75vw',
        }}>
            <Typography variant="h4" gutterBottom sx={{
                mx: 3, mt: 0, mb: 2, textAlign: 'center',
            }}>
                Loading...
            </Typography>
        </Box>);
    }
    return (<Box sx={{
            my: 1, bgcolor: 'background.paper', minWidth: '75vw',
        }}>
            <Typography variant="h4" gutterBottom sx={{
                mx: 3, mt: 0, mb: 2, textAlign: 'center',
            }}>
                Sent Applications
            </Typography>
            <ApplicationTable applications={applications}/>
        </Box>);
}