import getTemperatureStorage from '../storage/temperatureStorage'
import getBeerInfoStorage from '../storage/beerInfoStorage'

const temperatureStorage = getTemperatureStorage()
const beerInfoStorage = getBeerInfoStorage()

const getTemperatures = (req, res) => {
  const temps = temperatureStorage.getData()

  temps.map((item) => {
    item.beerInfo = beerInfoStorage.getById(item.typeId)
  })

  res.json(temps)
}

const putTemperatures = (req, res) => {
  try {
    temperatureStorage.upsertData(req.body)
    res.status(200).end()
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export default {
  getTemperatures,
  putTemperatures
}
