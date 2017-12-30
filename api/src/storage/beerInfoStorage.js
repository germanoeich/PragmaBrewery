export class BeerInfoStorage {
  constructor () {
    this.data = [
      { id: 1, name: 'Pilsner', minTemp: 4.0, maxTemp: 6.0 },
      { id: 2, name: 'IPA', minTemp: 5.0, maxTemp: 6.0 },
      { id: 3, name: 'Lager', minTemp: 4.0, maxTemp: 7.0 },
      { id: 4, name: 'Stout', minTemp: 6.0, maxTemp: 8.0 },
      { id: 5, name: 'Wheat beer', minTemp: 3.0, maxTemp: 5.0 },
      { id: 6, name: 'Pale Ale', minTemp: 4.0, maxTemp: 6.0 }
    ]
  }

  getById (id) {
    let returnValue
    this.getData().some((item) => {
      if (item.id === id) {
        returnValue = item
        return true
      }
      return false
    })
    return returnValue
  }

  getData () {
    return this.data
  }
}

const singleton = new BeerInfoStorage()

export default () => {
  return singleton
}
