import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Divider } from '@mui/material'

import { observer } from 'mobx-react-lite'

export default observer(() => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll="paper"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    Terms and Conditions of Using Voice Synthesis
                </DialogTitle>
                <DialogContent>
                    <div style={{ padding: 15 }}>
                        <Typography style={{ textTransform: 'capitalize', fontSize: 28, fontWeight: 'bolder', color: '#333', margin: '15px 0 15px 0' }}>
                            subject rights of the data
                        </Typography>
                        <Typography style={{ textTransform: 'none', lineHeight: 2.5 }}>
                            <obj style={{ marginRight: 35 }} />The user can request the data keeper to correct or even delete all the data regarding to the user. All materials and communications transmitted to or posted on the application in connection with the use of features on the system will be considered non-confidential, which can be used as the data and information for further study purpose. Also, it tells the user when they are using the system, each request they made in the system will be recorded, the data including the request message, date, time, the voice it applies, the IP address of the system host, voice materials they have used and the facial recognition data for the eye tracking feature. All the data above will be stored as a log record in the designated log file on the system.
                        </Typography>
                        <Divider style={{margin: '25px 0'}} />

                        <Typography style={{ textTransform: 'capitalize', fontSize: 28, fontWeight: 'bolder', color: '#333', margin: '15px 0 15px 0' }}>
                            material from users and collection and processing of personal data
                        </Typography>
                        <Typography style={{ textTransform: 'none', lineHeight: 2.5 }}>
                            <obj style={{ marginRight: 35 }} />Includes the voice samples of the user and facial recognition data, each time the user conduct eye tracking calibration, it collects the data from the user via the system, all data will be stored in the system for further usage. Other than that, the voice samples data will also be stored in the system as well, the samples will be selected by the user’ family or anyone who is close to the user, with providing and uploading the materials, the system have the right to conduct further process, such as voice synthesis with the sample provided. Also, the required time of voice cloning will be mentioned as well due to it usually takes more than a few hours or even a couple of days to achieve voice synthesis
                        </Typography>
                        <Divider style={{margin: '25px 0'}} />

                        <Typography style={{ textTransform: 'capitalize', fontSize: 28, fontWeight: 'bolder', color: '#333', margin: '15px 0 15px 0' }}>
                            legal basis for processing and storage period
                        </Typography>
                        <Typography style={{ textTransform: 'none', lineHeight: 2.5 }}>
                            <obj style={{ marginRight: 35 }} />Processes your personal data when necessary for the performance of an agreement with you and when we have another legitimate and justifiable interest in processing your personal data, such as optimising sysmte or any kind of further study. If process your personal data for any purpose which, according to applicable legislation, requires your consent, will not obtain your consent before conducting with such processing. The data collected in accordance with the above is deleted when the purposes of the processing have been completed.
                        </Typography>
                        <Divider style={{margin: '25px 0'}} />

                        <Typography style={{ textTransform: 'capitalize', fontSize: 28, fontWeight: 'bolder', color: '#333', margin: '15px 0 15px 0' }}>
                            security for the protection of personal data
                        </Typography>
                        <Typography style={{ textTransform: 'none', lineHeight: 2.5 }}>
                            <obj style={{ marginRight: 35 }} />Safeguarding your personal data with a high level of security and has to this end taken appropriate technical and organizational security measures to protect your personal data from unauthorised access, amendment, dissemination or destruction.
                        </Typography>
                        <Divider style={{margin: '25px 0'}} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})