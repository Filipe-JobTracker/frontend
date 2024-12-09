import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StatusChip from "../Applications/StatusChip.tsx";
import {useGlobalState} from "../../GlobalState.tsx";

const LAST_72H = 72 * 60 * 60 * 1000;

export default function RecentApplicationsTable() {
    const {applications} = useGlobalState();

    const filteredApplications = applications.filter((application) => (new Date().getTime() - new Date(application.lastUpdate).getTime()) <= LAST_72H);
    return (<TableContainer sx={{
        m: 0,
        // maxWidth: 500,
        maxHeight: {sm: 800},
    }}>
        <Table stickyHeader aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Company/Position</TableCell>
                    <TableCell align="center">Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredApplications.map((row) => (<TableRow
                    key={row.id}
                >
                    <TableCell align="center">
                        {row.company ? row.company.name : "No Company Data"} - {row.name}
                    </TableCell>
                    <TableCell align="center">
                        <StatusChip
                            status={row.status}
                            id={row.id}
                            active={row.active}/>
                    </TableCell>
                </TableRow>))}
            </TableBody>
        </Table>
    </TableContainer>);
}
