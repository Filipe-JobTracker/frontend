import {PieChart} from '@mui/x-charts/PieChart';
import Paper from "@mui/material/Paper"
import RecentApplicationsTable from "./RecentApplicationsTable";
import {ApplicationStatus} from "../../types.ts";
import {useEffect} from "react";
import {useGlobalState} from "../../GlobalState.tsx";


export default function BasicPie() {
    const {statistics} = useGlobalState();

    useEffect(() => {

    }, [statistics]);
    const applied = statistics?.applications.filter((application) => application.status === ApplicationStatus.APPLIED) || [];
    const ghosted = statistics?.applications.filter((application) => application.status === ApplicationStatus.GHOSTED) || [];
    const rejected = statistics?.applications.filter((application) => application.status === ApplicationStatus.REJECTED) || [];
    const interview = statistics?.applications.filter((application) => application.status === ApplicationStatus.INTERVIEW) || [];
    const called = statistics?.applications.filter((application) => application.status === ApplicationStatus.CALLED) || [];
    const offer = statistics?.applications.filter((application) => application.status === ApplicationStatus.OFFER) || [];
    const accepted = statistics?.applications.filter((application) => application.status === ApplicationStatus.ACCEPTED) || [];
    return (<Paper sx={{
            my: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }}>

            <PieChart
                series={[{
                    data: [{
                        id: 0,
                        color: 'blue',
                        value: applied.length,
                        label: 'Applied',
                    }, {
                        id: 1,
                        color: "orange",
                        value: ghosted.length,
                        label: 'Ghosted'
                    }, {
                        id: 2,
                        color: "red",
                        value: rejected.length,
                        label: 'Rejected'
                    }, {
                        id: 3,
                        color: "aquamarine",
                        value: interview.length,
                        label: 'Interviews'
                    }, {id: 4, color:"lightblue", value: called.length, label: 'Called'}, {
                        id: 5,
                        color: "green",
                        value: offer.length,
                        label: 'Offer'
                    }, {id: 6, value: accepted.length, label: 'Accepted'},],
                },]}
                width={600}
                height={400}
            />
            <RecentApplicationsTable/>

        </Paper>

    );
}
