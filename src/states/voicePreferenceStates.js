import { types } from 'mobx-state-tree'

const voiceListData = types
    .model({
        id: types.number,
        name: types.string,
        gender: types.string
    })

export const voiceList = types
    .model({
        list: types.array(voiceListData)
    })
    .views(self => ({
        getVoicesByGender(gender) {
            return self.list.filter(x => x.gender === gender.toLowerCase())
        }
    }))
    .actions(self => ({
        restoreData(item) {
            self.list.clear()

            item.forEach(data =>
                self.list.push(data)
            )
        },
        clear() {
            self.list.clear()
        }
    }))
    .create({
        list: []
    })

const ttsVoiceData = types
    .model({
        name: types.string,
        id: types.string,
        available: types.boolean
    })

export const ttsVoice = types
    .model({
        list: types.array(ttsVoiceData)
    })
    .actions(self => ({
        restoreData(item) {
            self.list.clear()
            item.forEach(data =>
                self.list.push(data)    
            )
        },
        add(item) {
            self.list.push({
                name: item.name,
                id: item.id,
                available: item.available
            })
        }
    }))
    .create({
        list: []
    })

// export const voicePreference = types
//     .model({
//         speechRate: types.number,
//         voiceID: types.number,
//         volume: types.number
//     })
//     .actions(self => ({
//         setData(data) {
//             self.speechRate = data.speechRate
//             self.voiceID = data.voiceID
//             self.volume = data.volume
//         },
//         clear() {
//             self.speechRate = 0
//             self.voiceID = 0
//             self.volume = 0
//         }
//     }))
//     .create({
//         speechRate: 0,
//         voiceID: 0,
//         volume: 0
//     })