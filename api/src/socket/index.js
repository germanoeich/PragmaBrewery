import getTemperatureStorage from '../storage/temperatureStorage'
import getBeerInfoStorage from '../storage/beerInfoStorage'

const temperatureStorage = getTemperatureStorage()
const beerInfoStorage = getBeerInfoStorage()

const setupWebSocket = (wss) => {
  wss.on('connection', (ws, req) => {
    const updateHandler = (obj) => {
      obj.beerInfo = beerInfoStorage.getById(obj.typeId)
      ws.send(JSON.stringify({ type: 'update', data: obj }), (error) => {
        if (error) {
          console.error(error)
        }
      })
    }

    temperatureStorage.on('data_updated', updateHandler)

    ws.on('close', () => {
      temperatureStorage.removeListener('data_updated', updateHandler)
    })

    ws.send(getSyncEventData())
  })
}

const getSyncEventData = () => {
  let temps = temperatureStorage.getData()

  temps.map((item) => {
    item.beerInfo = beerInfoStorage.getById(item.typeId)
  })

  return JSON.stringify({ type: 'sync', data: temps })
}

export default setupWebSocket
