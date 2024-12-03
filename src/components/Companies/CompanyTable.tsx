import {
    ChangeEvent, MouseEvent, useState, useMemo
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
import {CompanyProps} from "./Companies.tsx";
import {CompanyInfo} from "../../types.ts";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof CompanyInfo>(order: Order, orderBy: Key,): (a: CompanyInfo, b: CompanyInfo) => number {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof CompanyInfo;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [{
    id: 'name', numeric: false, disablePadding: false, label: 'Company',
}, {
    id: 'applications',
    numeric: true,
    disablePadding: false,
    label: 'Total Applications',
}];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof CompanyInfo) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property: keyof CompanyInfo) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (<TableHead>
        <TableRow>
            {headCells.map((headCell) => (<TableCell
                key={headCell.id}
                align="center"
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>) : null}
                </TableSortLabel>
            </TableCell>))}
        </TableRow>
    </TableHead>);
}

export default function CompanyTable({companies}: {
    companies: CompanyProps
}) {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof CompanyInfo>('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);


    const handleRequestSort = (_event: MouseEvent<unknown>, property: keyof CompanyInfo,) => {
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


    const visibleRows = useMemo(() => [...companies.companies]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, companies]);
    let counter: number = 0;
    return (<Box sx={{
        width: '100%', height: '80vh',
    }}>
        <Paper sx={{
            width: '100%', mb: 2,
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
                        {visibleRows.map((row) => {
                            return (<TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={counter++}
                                // sx={{height: 30}}
                                aria-label="lol"
                            >
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell
                                    align="center">{row.count}</TableCell>
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={companies.companies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </Box>);
}
