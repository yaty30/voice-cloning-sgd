import react, { useState, useEffect } from 'react'
import { Grid, Paper, Typography, Divider, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CreateDialog from './CreateDialog'
import ConsentDialog from './ConsentDialog';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { voiceList, ttsVoice } from '../states/voicePreferenceStates';


export default observer(() => {
    const [voicePre, setVoicePre] = useState(false);
    const [voiceMenu, setVoiceMenu] = useState("0");

    const [gender, setGender] = useState("Male");
    const [rate, setRate] = useState(145);
    const [voice, setVoice] = useState(0);
    const [volume, setvolume] = useState(1.0);

    const handleVoiceMenuChange = (event) => {
        setVoiceMenu(event.target.value);
        if(event.target.value === "0") {
            setVoice(0)
        } else {
            setVoice()
        }
    };

    const handleVoiceClickOpen = () => {
        document.getElementById("ismenuopened").innerText = "true"
        setVoicePre(true);
    };

    const handleVoicePreClose = () => {
        setVoicePre(false);
        document.getElementById("ismenuopened").innerHTML = "false"
    };

    const handleSave = () => {
        document.getElementById("currentVoice").innerText = voiceMenu
        document.getElementById("voiceID").innerText = voice
        document.getElementById("volume").innerText = volume
        document.getElementById("speechRate").innerText = rate
        handleVoicePreClose()
    }

    const VoiceSliders = (voiceMenu) => {

        const handleRateChange = (event, newValue) => {
            setRate(newValue);
        };
        const handleVoiceChange = (e) => {
            setVoice(e.target.value);
        };
        const handleVolumeChange = (event, newValue) => {
            setvolume(newValue);
        };
        const handleGenderChange = (e) => {
            setGender(e);
        };

        return (
            <Grid container spacing={6} style={{ padding: '25px 25px' }} justifyContent="center" alignContent="center">
                <Grid item xs={6}>
                    <Typography style={{ textAlign: 'center', width: '100%', color: voiceMenu === "0" ? '#7083C7' : '#D1D2D6', fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}>Speech Rate</Typography>
                    <Paper style={{ padding: 55 }}>
                        <Slider disabled={voiceMenu !== "0"} value={rate} valueLabelDisplay="auto" onChange={handleRateChange} min={10} max={300} />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ textAlign: 'center', width: '100%', color: voiceMenu === "0" ? '#7083C7' : '#D1D2D6', fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}>Voice</Typography>
                    <Paper style={{ padding: 45 }}>
                        {/* <Slider disabled={voiceMenu !== "0"} value={voice} valueLabelDisplay="auto" onChange={handleVoiceChange} min={0} max={48} /> */}
                        <FormControl fullWidth>
                            <InputLabel id="voice-label">Voices</InputLabel>
                            <Select
                                labelId="voice-label"
                                value={voice}
                                label="Voices"
                                disabled={voiceMenu !== "0"}
                                onChange={handleVoiceChange}
                            >
                                {voiceList.getVoicesByGender(gender).map((x, i) =>
                                    <MenuItem value={x.id} key={i}>{x.name}</MenuItem>
                                )}
                            </Select>

                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ textAlign: 'center', width: '100%', color: voiceMenu === "0" ? '#7083C7' : '#D1D2D6', fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}>Volume</Typography>
                    <Paper style={{ padding: 55 }}>
                        <Slider disabled={voiceMenu !== "0"} value={volume} valueLabelDisplay="auto" onChange={handleVolumeChange} min={10} max={50} step={0.2} />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ textAlign: 'center', width: '100%', color: voiceMenu === "0" ? '#7083C7' : '#D1D2D6', fontSize: 15, marginBottom: 10, fontWeight: 'bold' }}>Gender</Typography>
                    <Paper style={{ padding: 48, textAlign: 'center' }}>
                        {
                            voiceMenu === "0" ?
                                <>
                                    <Button
                                        disabled={voiceMenu !== "0"}
                                        style={{ background: gender === "Female" ? '#B3C3FB' : '#F8F8F8', color: gender === "Female" ? '#fff' : '#B3C3FB', fontWeight: 'bold', width: 150, height: 50, border: '1px solid #B4B4B4', boxShadow: '0px 0px 10px rgba(186, 186, 186, 0.25)', fontSize: 19, marginRight: 55 }}
                                        onClick={() => setGender("Female")}
                                    >
                                        Female
                                    </Button>
                                    <Button
                                        disabled={false}
                                        style={{ background: gender === "Male" ? '#B3C3FB' : '#F8F8F8', color: gender === "Male" ? '#fff' : '#B3C3FB', fontWeight: 'bold', width: 150, height: 50, border: '1px solid #B4B4B4', boxShadow: '0px 0px 10px rgba(186, 186, 186, 0.25)', fontSize: 19 }}
                                        onClick={() => setGender("Male")}
                                    >
                                        Male
                                    </Button>
                                </>
                                :
                                <>
                                    <Button
                                        disabled={voiceMenu !== "0"}
                                        style={{ background: '#F8F8F8', color: '#D1D2D6', fontWeight: 'bold', width: 150, height: 50, border: '1px solid #DDDDDD', fontSize: 19, marginRight: 55 }}
                                    >
                                        Female
                                    </Button>
                                    <Button
                                        disabled={voiceMenu !== "0"}
                                        style={{ background: '#F8F8F8', color: '#D1D2D6', fontWeight: 'bold', width: 150, height: 50, border: '1px solid #DDDDDD', fontSize: 19 }}
                                    >
                                        Male
                                    </Button>
                                </>
                        }
                    </Paper>
                </Grid>
            </Grid>
        )
    }


    return (
        <div>
            <Grid container style={{ position: 'absolute', left: '90%', top: 50, zIndex: 999 }}>
                <Grid item xs={1}>
                    <Paper style={{ height: 1100 }}>
                        <div style={{ position: 'relative', top: 25 }}>
                            <Typography>
                                <RemoveRedEyeIcon /> GAZETracker
                            </Typography>
                            <Divider style={{ margin: '15px 10px' }} variant="middle" />

                            <Button style={{ height: 450, width: 150, margin: '15px 10px', background: '#F8F8F8' }} onClick={handleVoiceClickOpen}>
                                {/* <SettingsRoundedIcon /> */}
                                <Typography style={{ color: '#616161', fontWeight: 'bold' }}>
                                    VOICE PREFERENCES
                                </Typography>
                            </Button>
                            <CreateDialog />
                            {/* <Button style={{ height: 450, margin: '15px 10px', width: 150, background: '#F8F8F8' }} onClick={handleSettingClickOpen}>
                                <Typography style={{ color: '#616161', fontWeight: 'bold' }}>
                                    SETTINGS
                                </Typography>
                            </Button> */}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={voicePre}
                onClose={handleVoicePreClose}
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle>
                    Voice Preferences
                </DialogTitle>
                <DialogContent>
                    <div style={{ padding: '0 15px', margin: '25px 5px' }}>

                        <FormControl fullWidth>
                            <InputLabel id="voice-label">Voices</InputLabel>
                            <Select
                                labelId="voice-label"
                                value={voiceMenu}
                                label="Voices"
                                onChange={handleVoiceMenuChange}
                            >
                                {ttsVoice.list.map((x, i) =>
                                    <MenuItem value={x.id} disabled={!!!x.available}>{x.name} {!!!x.available && "(Pending)"}</MenuItem>
                                )}
                            </Select>

                        </FormControl>
                    </div>

                    {VoiceSliders(voiceMenu)}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleVoicePreClose}>Back</Button>
                    <Button onClick={handleSave} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div >
    )
})