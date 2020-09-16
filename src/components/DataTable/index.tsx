import React, {FC, useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {IAppState, loadPageTrigger} from "../../store/types";

const columns = [
    'Name',
    'Market Cap',
    'Price',
    'Volume',
    'Change (24h)'
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: '5%'
    },
    row: {
        "&:hover": {
            cursor: 'pointer'
        }
    }
});

const StyledCell = styled(TableCell)`
    min-width: 170px !important;
    align-text: right !important;
`;

export const DataTable: FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rows = useSelector((state: IAppState) => state.itemsList);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: loadPageTrigger, payload: {start: page * rowsPerPage, size: rowsPerPage}});
    }, [page, dispatch, rowsPerPage]);

    const handleClick = useCallback(
        (symbol: string) => history.push(`/currency/${symbol}`),
        [history]
    );

    return (
        <Paper className={classes.root}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell key={column}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.get.map(row => (
                            <TableRow
                                hover
                                role="checkbox"
                                onClick={(e: unknown) => handleClick(row.symbol)}
                                tabIndex={-1} key={row.symbol} className={classes.row}
                            >
                                <StyledCell>{row.name}</StyledCell>
                                <StyledCell>{'$' + row.market_cap}</StyledCell>
                                <StyledCell>{'$' + row.price}</StyledCell>
                                <StyledCell>{'$' + row.volume}</StyledCell>
                                <StyledCell>{row.percent_change_24h + '%'}</StyledCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
                count={rows.total_count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(e: unknown, newPage: number) => setPage(newPage)}
                onChangeRowsPerPage={(event: any) => {
                    setRowsPerPage(+event.target.value);
                    setPage(0);
                }}
            />
        </Paper>
    );
}
