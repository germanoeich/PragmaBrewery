require('dotenv').load()
const fetch = require('node-fetch')

const randomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
}

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const beerTypes = [
  { id: 1, name: 'Pilsner', minTemp: 4.0, maxTemp: 6.0 },
  { id: 2, name: 'IPA', minTemp: 5.0, maxTemp: 6.0 },
  { id: 3, name: 'Lager', minTemp: 4.0, maxTemp: 7.0 },
  { id: 4, name: 'Stout', minTemp: 6.0, maxTemp: 8.0 },
  { id: 5, name: 'Wheat beer', minTemp: 3.0, maxTemp: 5.0 },
  { id: 6, name: 'Pale Ale', minTemp: 4.0, maxTemp: 6.0 }
]

const sendData = (id, typeId) => {
  const body = {
    id: id,
    typeId: typeId,
    temperature: randomFloat(beerTypes[typeId - 1].minTemp  - 1, beerTypes[typeId - 1].maxTemp + 1)
  }

  console.log('Sending data:', JSON.stringify(body))

  fetch(`${apiUrl}/temperatures`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json"}
  })
}

const timeInterval = process.env.REPORT_INTERVAL
const containersCount = parseInt(process.env.CONTAINERS_COUNT)
const beerTypeMode = process.env.BEERTYPE_MODE
const apiUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`

let beerTypeCounter = 0
for(let i = 0; i < containersCount; i++) {
  const interval = (timeInterval !== 'random') ? parseInt(timeInterval) : randomInt(10, 40)

  let beerType
  if (beerTypeMode === 'random') {
    const rand = randomInt(0, beerTypes.length)
    beerType = beerTypes[rand].id
  } else if (beerTypeMode === 'sequential') {
    beerType = beerTypes[beerTypeCounter]
    beerTypeCounter++
    if (!beerType) {
      beerTypeCounter = 1
      beerType = beerTypes[0]
    }
  }

  setInterval(() => sendData(i, beerType.id), interval * 1000)
}
