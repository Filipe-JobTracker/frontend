import {PieChart} from '@mui/x-charts/PieChart';
import Paper from "@mui/material/Paper"
import {ApplicationStatus} from "../../types.ts";
import {useEffect} from "react";
import {useGlobalState} from "../../GlobalState.tsx";
import {useTheme} from '@mui/material/styles';


export default function BasicPie() {
    const {statistics} = useGlobalState();
    const theme = useTheme();
    useEffect(() => {
    }, [statistics]);

    const applied = statistics?.applications.filter((application) => application.status === ApplicationStatus.APPLIED) || [];
    const ghosted = statistics?.applications.filter((application) => application.status === ApplicationStatus.GHOSTED) || [];
    const rejected = statistics?.applications.filter((application) => application.status === ApplicationStatus.REJECTED) || [];
    const interview = statistics?.applications.filter((application) => application.status === ApplicationStatus.INTERVIEW) || [];
    const called = statistics?.applications.filter((application) => application.status === ApplicationStatus.CALLED) || [];
    const offer = statistics?.applications.filter((application) => application.status === ApplicationStatus.OFFER) || [];
    const accepted = statistics?.applications.filter((application) => application.status === ApplicationStatus.ACCEPTED) || [];
    const technicalTest = statistics?.applications.filter((application) => application.status === ApplicationStatus.TECHNICAL_TEST) || [];
    const technicalInterview = statistics?.applications.filter((application) => application.status === ApplicationStatus.TECHNICAL_INTERVIEW) || [];
    return (<Paper sx={{
            my: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }}>

            <PieChart
                sx={{
                    borderWidth: 0,
                }}
                series={[{
                    data: [{
                        id: 0,
                        color: theme.palette.info.main,
                        value: applied.length,
                        label: 'Applied',
                    }, {
                        id: 1,
                        color: theme.palette.grey[500],
                        value: ghosted.length,
                        label: 'Ghosted'
                    }, {
                        id: 2,
                        color: theme.palette.error.main,
                        value: rejected.length,
                        label: 'Rejected'
                    }, {
                        id: 3,
                        color: theme.palette.secondary.main,
                        value: interview.length,
                        label: 'Interviews'
                    }, {
                        id: 4,
                        color: theme.palette.warning.main,
                        value: called.length,
                        label: 'Called'
                    }, {
                        id: 5,
                        color: theme.palette.success.main,
                        value: offer.length,
                        label: 'Offer'
                    }, {
                        id: 6,
                        color: theme.palette.primary.main,
                        value: accepted.length,
                        label: 'Accepted'
                    },
                        {
                            id: 7,
                            color: theme.palette.warning.main,
                            value: technicalTest.length,
                            label: 'Technical Test'
                        },
                        {
                            id: 8,
                            color: theme.palette.warning.main,
                            value: technicalInterview.length,
                            label: 'Technical Interview'
                        },
                    ],
                },]}
                // width={600}
                height={400}
            />

        </Paper>

    );
}
