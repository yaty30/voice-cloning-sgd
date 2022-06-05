import { types } from 'mobx-state-tree'
import { direction } from '../controller'
import { fetchDirection } from '../axios/fetch'

export const dialogs = types
    .model({
        createVoiceOpen: types.boolean
    })
    .actions(self => ({
        setCreateVoiceOpen() {
            self.createVoiceOpen = !!!self.createVoiceOpen
        }
    }))
    .create({
        createVoiceOpen: false
    })

export const words = [
    "Good Morning",
    "Good Afternoon",
    "YES", "NO"
]

const positionData = types
    .model({
        id: types.string,
        x: types.array(types.number),
        y: types.array(types.number)
    })

export const pickerState = types
    .model({
        direction: types.string,
        fetchCount: types.number,
        currentSelected: types.number,
        clicked: types.number,
        length: types.number,
        positions: types.array(positionData)
    })
    .actions(self => ({
        updateCurrentSelected(res) {
            self.fetchCount += 1
            self.currentSelected = res
        },
        setClick(res) {
            self.clicked = res
        },
        updateRestoreNumber() {
            self.length += 1
        },
        restorePositionData(item) {
            item.forEach(data =>
                self.positions.push(data)    
            )
        },
        clearDirection() {
            self.direction = ""
        }
    }))
    .views(self => ({
        getDirection() {
            return self.direction
        },
        getCurrentSelected() {
            return self.currentSelected
        },
        getFetchCount() {
            return self.fetchCount
        },
        getClick() {
            return self.clicked
        },
        getLength() {
            return self.length === 26
        }
    }))
    .create({
        direction: "",
        fetchCount: 0,
        currentSelected: 0,
        clicked: 0,
        length: 0,
        positions: []
    })