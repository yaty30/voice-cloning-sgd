import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CachedIcon from '@mui/icons-material/Cached';
import { getHistory } from '../axios/fetch';

import { historyList } from '../states/historyStates';

import { observer } from 'mobx-react-lite'

export default observer(() => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        document.getElementById("ismenuopened").innerText = "true"
    };

    const handleClose = () => {
        setOpen(false);
        document.getElementById("ismenuopened").innerText = "false"
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} style={{ marginTop: 10 }}>
                Show all history
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    Request History
                </DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Message</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {historyList.list.map((row, i) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        hover
                                    >
                                        <TableCell component="th" align="center" scope="row" style={{width: 20}}>
                                            {i + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.message}
                                        </TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{row.time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={getHistory}>
                        <CachedIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>
        </div>
    );
})