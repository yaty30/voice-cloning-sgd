import react, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { pickerState, words } from '../states/wordStates'

import { Grid, Button } from '@mui/material'

import { fetchDirection, delay } from '../axios/fetch'

export default observer(() => {
    const [buttonIndex, setButtonIndex] = useState("")
    const [selectedWord, setWord] = useState("")

    const buttonStyles = { width: 650, height: 450, fontSize: 45 }

    const getSelectedButtonIndex = () => {
        const el = document.getElementById("selectedButtonIndex")
        setButtonIndex(+el.innerHTML)
    }

    const getVariant = (i) => {
        return buttonIndex === i ? "contained" : "outlined"
    }

    const getButtonClass = (i) => {
        return buttonIndex === i ? "selectedButton" : ""
    }

    window.setInterval(getSelectedButtonIndex, 200)

    return (
        <div id="buttonBody" style={{position: 'relative', bottom: 35}}>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Grid container spacing={10}>

                        <Grid item xs={6} style={{position: 'relative', left: '15%', top: 150}}>
                            <Button className={getButtonClass(0)} variant={getVariant(0)} style={buttonStyles} id="btn_0" onClick={() => console.log(document.getElementById("selectedButtonIndex").textContent)}>
                                {words[0]}
                            </Button>
                        </Grid>

                        <Grid item xs={6} style={{position: 'relative', right: '3%', top: 150}}>
                            <Button className={getButtonClass(1)} variant={getVariant(1)} style={buttonStyles} id="btn_1">
                                {words[1]}
                            </Button>
                        </Grid>

                        <Grid item xs={6} style={{position: 'relative', left: '15%', top: 140}}>
                            <Button className={getButtonClass(2)} variant={getVariant(2)} style={buttonStyles} id="btn_2">
                                {words[2]}
                            </Button>
                        </Grid>

                        <Grid item xs={6} style={{position: 'relative', right: '3%', top: 137}}>
                            <Button className={getButtonClass(3)} variant={getVariant(3)} style={buttonStyles} id="btn_3">
                                {words[3]}
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                    {selectedWord}
                </Grid> */}
            </Grid>
        </div>
    )
})