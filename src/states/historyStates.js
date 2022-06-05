import { types } from 'mobx-state-tree'

const historyListData = types
    .model({
        message: types.string,
        date: types.string,
        time: types.string
    })

export const historyList = types
    .model({
        list: types.array(historyListData)
    })
    .views(self => ({
        getList() {
            let list = self.list.slice(0, 4)
            return list
        }
    }))
    .actions(self => ({
        restoreData(item) {
            self.list.clear()
            item.forEach(data =>
                self.list.push(data)
            )
        }
    }))
    .create({
        list: []
    })