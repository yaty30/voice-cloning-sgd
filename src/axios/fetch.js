import axios from 'axios'
import { pickerState } from '../states/wordStates'
import { historyList } from '../states/historyStates'
import { voiceList, ttsVoice } from '../states/voicePreferenceStates'


const host = "http://localhost:5000"

const fetch = async (method, url, body) => {
    const mainFetch = async () => {
        const header = {
            headers: {
                'Content-Type': 'application/text',
                'Accept': 'application/text'
            }
        }

        if (method === "post") {
            return axios.post(host + url, { body })
                .then(res => res.data)
        } else {
            return axios.get(host + url, header)
                .then(res => res.data)
        }
    }

    try {
        const res = await mainFetch()
        return res
    }
    catch (err) {
        console.log(err)
    }
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const postWord = async (word) => {
    await fetch("post", `/${word}`, { body: word })
        .then(res => {
            return res
        })
}


export const getVoices = async () => {
    await fetch("get", "/getVoices")
        .then(res => {
            voiceList.restoreData(res)
            console.log(JSON.stringify(voiceList.getVoicesByGender("female")))
            return res
        })
}

export const getHistory = async () => {
    await fetch("get", "/getHistory")
        .then(res => {
            historyList.restoreData(res)
            return res
        })
}

export const getTTSVoices = async () => {
    await fetch("get", "/getTTSVoices")
        .then(res => {
            ttsVoice.restoreData(JSON.parse(res))
            return res
        })
        .catch(err => console.log(err))
}

export const createNewVoice = async (body) => {
    return await fetch("post", "/createNewVoice", body)
        .then(res => {
            console.log(res)
        })
}