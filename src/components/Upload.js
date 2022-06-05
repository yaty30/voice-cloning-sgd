import react, { useState, useEffect } from 'react'
import { Grid, Paper, Button, Typography, Tooltip, IconButton, Divider } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { createNewVoice, getTTSVoices } from '../axios/fetch';

import { observer } from 'mobx-react-lite'
import { dialogs } from '../states/wordStates';
import { ttsVoice } from '../states/voicePreferenceStates';

export default observer(() => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [finished, setFinished] = useState(false);
    const [copen, setCOpen] = useState(false);
    const [warning, setWarning] = useState(false)
    const [name, setName] = useState("")
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let filesArray = []
    const [files, setFiles] = useState(filesArray);

    const handleUpload = (data) => {
        setFiles((x) => [
            ...x, data,
        ]);
    }

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     filesArray.clear()
    // });

    useEffect(() => {
        filesArray = []
    }, [])

    const handleToggle = () => {
        setCOpen(true)
        createNewVoice({
            name: name,
            files: filesArray
        })
    };

    const getFileUI = (x) => {
        return (
            <>
                <Button style={{ color: '#7289DC', background: '#E9EEFF', width: 180, height: 180, fontSize: 28 }} disabled>{x.size}</Button>
                <Typography style={{ color: '#909090', marginTop: 10 }}>{x.name.length > 25 ? `${x.name.substring(0, 12)}...${x.name.substring(x.name.length - 8, x.name.length)}` : x.name}</Typography>
            </>
        )
    }

    const DeleteButton = (id) => {
        const handleDelete = () => {
            let list = files.filter(x => x.id !== id)

            setFiles(list)
        }
        return (
            <IconButton onClick={handleDelete}>
                <DeleteForeverIcon style={{ color: '#fff', fontSize: 25 }} />
            </IconButton>
        )
    }

    // const FinishedDialog = () => {
    //     const handleClose = () => {
    //         setFinished(false);
    //     };

    //     const handleOkay = () => {
    //         setFinished(false);
    //         document.getElementById("isuploaded").innerHTML = "true"
    //     }

    //     return (
    //         <div>
    //             <Stack sx={{ width: '100%' }} spacing={2}>
    //                 <Alert severity="error">This is an error alert — check it out!</Alert>
    //                 <Alert severity="warning">This is a warning alert — check it out!</Alert>
    //                 <Alert severity="info">This is an info alert — check it out!</Alert>
    //                 <Alert severity="success">This is a success alert — check it out!</Alert>
    //             </Stack>
    //             <Dialog
    //                 open={finished}
    //                 onClose={handleClose}
    //                 fullWidth
    //                 maxWidth="md"
    //             >
    //                 <DialogContent>
    //                     <Typography style={{ textAlign: 'center', width: '100%', fontSize: 18, color: '#898989' }}>
    //                         Record samples has been uploaded successfully!
    //                     </Typography>

    //                     <div style={{ padding: '15px 25px', background: 'rgba(255, 40, 40, 0.3)', borderRadius: 10, marginTop: 25 }}>
    //                         <Typography style={{ textAlign: 'center', width: '100%', color: '#853F3F', fontSize: 27 }}>
    //                             Custom voice requires a few hours to days to generate, please be patient.
    //                         </Typography>
    //                     </div>
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <Button onClick={handleOkay} autoFocus>
    //                         Okay
    //                     </Button>
    //                 </DialogActions>
    //             </Dialog>
    //         </div>
    //     );
    // }

    const Consent = () => {
        const handleAgree = () => {
            setWarning(true)
            setCOpen(false);
        }

        const handleClose = () => {
            setCOpen(false);
        };

        return (
            <div>
                <Dialog
                    open={copen}
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
                            <Divider style={{ margin: '25px 0' }} />

                            <Typography style={{ textTransform: 'capitalize', fontSize: 28, fontWeight: 'bolder', color: '#333', margin: '15px 0 15px 0' }}>
                                material from users and collection and processing of personal data
                            </Typography>
                            <Typography style={{ textTransform: 'none', lineHeight: 2.5 }}>
                                <obj style={{ marginRight: 35 }} />Includes the voice samples of the user and facial recognition data, each time the user conduct eye tracking calibration, it collects the data from the user via the system, all data will be stored in the system for further usage. Other than that, the voice samples data will also be stored in the system as well, the samples will be selected by the user’ family or anyone who is close to the user, with providing and uploading the materials, the system have the right to conduct further process, such as voice synthesis with the sample provided. Also, the required time of voice cloning will be mentioned as well due to it usually takes more than a few hours or even a couple of days to achieve voice synthesis
                            </Typography>
                            <Divider style={{ margin: '25px 0' }} />

                            <Typography style={{ textTransform: 'capitalize', fontSize: 28, fontWeight: 'bolder', color: '#333', margin: '15px 0 15px 0' }}>
                                legal basis for processing and storage period
                            </Typography>
                            <Typography style={{ textTransform: 'none', lineHeight: 2.5 }}>
                                <obj style={{ marginRight: 35 }} />Processes your personal data when necessary for the performance of an agreement with you and when we have another legitimate and justifiable interest in processing your personal data, such as optimising sysmte or any kind of further study. If process your personal data for any purpose which, according to applicable legislation, requires your consent, will not obtain your consent before conducting with such processing. The data collected in accordance with the above is deleted when the purposes of the processing have been completed.
                            </Typography>
                            <Divider style={{ margin: '25px 0' }} />

                            <Typography style={{ textTransform: 'capitalize', fontSize: 28, fontWeight: 'bolder', color: '#333', margin: '15px 0 15px 0' }}>
                                security for the protection of personal data
                            </Typography>
                            <Typography style={{ textTransform: 'none', lineHeight: 2.5 }}>
                                <obj style={{ marginRight: 35 }} />Safeguarding your personal data with a high level of security and has to this end taken appropriate technical and organizational security measures to protect your personal data from unauthorised access, amendment, dissemination or destruction.
                            </Typography>
                            <Divider style={{ margin: '25px 0' }} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleAgree} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    const FinishedUpload = () => {
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setFinished(false);
            // document.getElementById("isuploaded").innerHTML = "true"
            dialogs.setCreateVoiceOpen()
            ttsVoice.add({ name: name, id: `${Math.floor(Math.random() * 100)}`, available: false })
            getTTSVoices()
        };

        const action = (
            <>
                <Button color="secondary" size="small" onClick={handleClose}>
                    Close
                </Button>
                {/* <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton> */}
            </>
        )

        return (
            <div>
                <Snackbar
                    open={finished}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Record samples has been uploaded successfully!"
                    action={action}
                />
            </div>
        );
    }

    const Warning = () => {
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setWarning(false);
            setOpen(true);

            setInterval(() => {
                setFinished(true)
                setOpen(false)
            }, 2500)
        };

        const action = (
            <>
                <Button color="secondary" size="small" onClick={handleClose}>
                    Okay
                </Button>
                {/* <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton> */}
            </>
        )

        return (
            <div>
                <Snackbar
                    open={warning}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Custom voice requires a few hours to days to generate, please be patient."
                    action={action}
                />
            </div>
        );
    }


    return (
        <div style={{ padding: 100, overflow: 'scroll !important' }}>
            {/* <FinishedDialog /> */}
            <FinishedUpload />
            <Warning />
            <Consent />
            <Paper style={{ padding: 25 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" value={name} onChange={(e) => setName(e.target.value)} label="Voice Name" style={{ width: '100%', textTransform: 'capitalize' }} />
                    </Grid>
                    <Grid item xs={12}>
                        {files.length === 20 ?
                            <Button
                                style={{ height: 500, width: '100%', background: '#FCFCFC', fontSize: 30, border: '1px dashed #DBDBDB' }}
                                onChange={(e) => {
                                    handleUpload({
                                        id: files.length + 1,
                                        file: e.target.files[0],
                                        name: e.target.files[0].name,
                                        size: `${(1000000 / e.target.files[0].size).toFixed(1)} MB`
                                    })
                                }}
                                onClick={handleToggle}
                                disabled={warning}
                            >
                                {open ? <CircularProgress color="inherit" size={40} /> : "Send files to server"}
                            </Button>
                            :
                            <Button
                                style={{ height: 500, width: '100%', background: '#FCFCFC', fontSize: 30, border: '1px dashed #DBDBDB' }} component="label"
                                onChange={(e) => {
                                    e.target.files.length > 1 ?
                                        Array.from(Array(e.target.files.length).keys()).map((_, i) => {
                                            handleUpload({
                                                id: files.length + 1,
                                                file: e.target.files[i],
                                                name: e.target.files[i].name,
                                                size: `${(1000000 / e.target.files[i].size).toFixed(1)} MB`
                                            })
                                        })
                                        :
                                        handleUpload({
                                            id: files.length + 1,
                                            file: e.target.files[0],
                                            name: e.target.files[0].name,
                                            size: `${(1000000 / e.target.files[0].size).toFixed(1)} MB`
                                        })
                                }}
                                disabled={files.length === 20}
                            >
                                <input type="file" hidden accept="audio/*" multiple />
                                Add new record sample
                            </Button>
                        }
                    </Grid>

                    <Grid item xs={12}>
                        <Typography style={{ fontSize: 25, color: '#BDBDBD', fontWeight: 'bold', textAlign: 'center' }}>
                            {files.length} / 20
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ width: '100%' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                scrollButtons
                                allowScrollButtonsMobile
                                variant="scrollable"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                {files.map((x, i) =>
                                    <Tooltip title={DeleteButton(x.id)} placement="top" arrow>
                                        <Tab value="one" label={getFileUI(x)} key={i} />
                                    </Tooltip>
                                )}
                            </Tabs>
                        </Box>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
})

/* Rectangle 22 */
