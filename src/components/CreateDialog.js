import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Upload from './Upload'
import { dialogs } from '../states/wordStates';
import { observer } from 'mobx-react-lite';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default observer(() => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        dialogs.setCreateVoiceOpen()
        document.getElementById("ismenuopened").innerText = "true"
    };

    const handleClose = () => {
        dialogs.setCreateVoiceOpen()
        document.getElementById("ismenuopened").innerText = "false"
    };

    return (
        <div>
            <Button style={{ height: 450, margin: '15px 10px', width: 150, background: '#F8F8F8' }} onClick={handleClickOpen}>
                <Typography style={{ color: '#616161', fontWeight: 'bold' }}>
                    Create New Voice
                </Typography>
            </Button>
            <Dialog
                fullWidth
                maxWidth="xl"
                open={dialogs.createVoiceOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <DialogTitle>
                    Create Voice
                </DialogTitle>
                <DialogContent>

                    <Upload />

                </DialogContent>
            </Dialog>
        </div>
    );
})