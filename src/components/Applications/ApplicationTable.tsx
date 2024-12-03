import {
    ChangeEvent,
    MouseEvent,
    useState,
    useMemo
} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';
import StatusChip from "./StatusChip.tsx";
import dayjs from "dayjs";
import {Link} from "@mui/material";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import {Application} from "../../types.ts";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (orderBy !== 'company') {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    } else {
        // @ts-expect-error name can be null
        if (b[orderBy]?.name < a[orderBy]?.name) {
            return -1;
        }
        // @ts-expect-error name can be null
        if (b[orderBy]?.name > a[orderBy]?.name) {
            return 1;
        }
        return 0;
    }

}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof Application>(order: Order, orderBy: Key,): (a: Application, b: Application) => number {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Application;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [{
    id: 'active', numeric: true, disablePadding: false, label: 'Active',
}, {
    id: 'company', numeric: false, disablePadding: false, label: 'Company',
}, {
    id: 'name', numeric: true, disablePadding: false, label: 'Position',
}, {
    id: 'link', numeric: true, disablePadding: false, label: 'Link',
}, {
    id: 'status', numeric: true, disablePadding: false, label: 'Status',
}, {
    id: 'appliedAt', numeric: true, disablePadding: false, label: 'Applied At',
}, {
    id: 'lastUpdate', numeric: true, disablePadding: false, label: 'Updated At',
},];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof Application) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property: keyof Application) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (<TableHead>
        <TableRow>
            {headCells.map((headCell) => (<TableCell
                key={headCell.id}
                align="left"
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    sx={{display: 'flex', flexDirection: "row-reverse", justifyContent: 'center', ml: -2.5}}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>) : null}
                    {headCell.label}
                </TableSortLabel>
            </TableCell>))}
        </TableRow>
    </TableHead>);
}

export default function ApplicationTable({applications}: {
    applications: Application[]
}) {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Application>('active');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);


    const handleRequestSort = (
        _event: MouseEvent<unknown>, property: keyof Application,) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const visibleRows = useMemo(() => [...applications]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [order, orderBy, page, rowsPerPage, applications]);
    let counter: number = 0;
    return (<Box sx={{
        width: '100%', height: '80vh',
    }}>
        <Paper sx={{
            width: '100%', mb: 2
        }}>
            <TableContainer>
                <Table
                    sx={{
                        width: '100%', height: '100%',
                    }}
                    aria-labelledby="tableTitle"
                    size='medium'
                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;
                            const tempAplied: string = dayjs(row.appliedAt).format("DD MMM. YYYY").toString();
                            const tempUpdate: string = dayjs(row.lastUpdate).format("DD MMM. YYYY").toString();
                            const link = <Link
                                href={row.link}><LanguageRoundedIcon/></Link>
                            const active = row.active ?
                                <CheckCircleRoundedIcon color="success" sx={{
                                    fontSize: 32,
                                }}/> : <CancelRoundedIcon color="error" sx={{
                                    fontSize: 32,
                                }}/>;
                            return (<TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={counter++}
                                // sx={{cursor: 'pointer'}}
                                aria-label={labelId}
                            >
                                <TableCell
                                    align="center">{active}</TableCell>
                                <TableCell
                                    align="center">{row.company.name}</TableCell>
                                <TableCell
                                    align="center">{row.name}</TableCell>
                                <TableCell
                                    align="center">{link}</TableCell>
                                <TableCell
                                    align="center"><StatusChip
                                    status={row.status}
                                    id={row.id}
                                    active={row.active}/>
                                </TableCell>
                                <TableCell
                                    align="center">{tempAplied}</TableCell>
                                <TableCell
                                    align="center">{tempUpdate}</TableCell>
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={applications.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </Box>);
}
