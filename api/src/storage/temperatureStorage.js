import EventEmitter from 'eventemitter3'

export class TemperatureStorage extends EventEmitter {
  constructor () {
    super()
    this.data = []
  }

  getData () {
    return this.data
  }

  upsertData (obj) {
    if (obj.id === undefined) {
      throw new Error('Object without ID')
    }

    if (this.data.some(item => item.id === obj.id)) {
      this.data = this.data.map((item) => {
        if (item.id === obj.id) {
          return obj
        }
        return item
      })
    } else {
      this.data.push(obj)
    }
    this.emit('data_updated', obj, this.data)
  }
}

const singleton = new TemperatureStorage()

export default () => {
  return singleton
}
