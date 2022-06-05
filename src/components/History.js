import react, { useState, useEffect } from 'react'
import { Grid, Paper, Typography, Button } from '@mui/material'
import ApiIcon from '@mui/icons-material/Api';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';

import HistoryDialog from './HistoryDialog'

import { historyList } from '../states/historyStates';
import { observer } from 'mobx-react-lite'

export default observer(() => {
    const [count, setCount] = useState(0)

    // setInterval(() => {
    //     getHistory()
    // }, 50000)

    // useEffect(() => {
    //     document.getElementById("fetchHistory").innerText === "true" && getHistory()
    // }, [count])

    return (
        <Paper elevation={3} variant="outlined" style={{ position: 'absolute', top: '63%', left: 20, padding: 15, borderRadius: 15, width: 370, height: 400, borderColor: '#EAEAEA', zIndex: 99 }}>
            <div style={{ height: 285 }}>
                {historyList.getList().map((x, i) =>
                    <Paper elevation={0} style={{ background: '#F9F9F9', borderRadius: 20, marginBottom: 10 }} key={i}>
                        <div style={{ padding: 10 }}>
                            <Typography>
                                <ApiIcon style={{ position: 'relative', top: 10, right: 10, color: '#96EBA3' }} /> <span style={{ fontSize: 18, fontWeight: 'bold' }}>MESSAGE: {x.message}</span>
                            </Typography>
                            <Typography style={{ fontSize: 15, color: '#B1B1B1', fontWeight: 'bold' }}>
                                <EventIcon style={{ fontSize: 15, position: 'relative', bottom: 1 }} /> <span style={{ marginRight: 10 }}>{x.date}</span> <AccessTimeIcon style={{ fontSize: 15, position: 'relative', bottom: 1 }} /> {x.time}
                            </Typography>
                        </div>
                    </Paper>
                )}

                <HistoryDialog />
                
            </div>
        </Paper>
    )
})