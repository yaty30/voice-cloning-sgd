import react, { useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { observer } from 'mobx-react-lite'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default observer(() => {
    return (
        <Grid container style={{ position: 'relative', left: '24%', top: 50 }}>
            <Grid item xs={8}>
                <Paper style={{ textAlign: 'left', padding: 15, width: '96.5%' }}>
                    <AccountCircleIcon style={{ fontSize: 40,marginRight: 15, marginLeft: 15 }} /> John Chan
                </Paper>
            </Grid>
        </Grid>
    )
})