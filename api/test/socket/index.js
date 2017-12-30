/* eslint no-unused-expressions:0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import getTemperatureStorage from '../../src/storage/temperatureStorage'
import WebSocket from 'ws'

const temperatureStorage = getTemperatureStorage()

describe('#websocket', () => {
  it('Should connect', (done) => {
    const ws = new WebSocket('ws://localhost:8080')
    ws.on('open', () => { ws.close(); done() })
  })

  it('Should sync when connected', (done) => {
    const ws = new WebSocket('ws://localhost:8080')
    ws.on('message', (data) => {
      const obj = JSON.parse(data)
      expect(obj).to.have.property('type').equal('sync')
      done()
      ws.close()
    })
  })

  it('Should send update event when data changes', (done) => {
    const mock = { id: 1, temperature: 4, typeId: 1 }
    const ws = new WebSocket('ws://localhost:8080')
    setTimeout(() => {
      temperatureStorage.upsertData(mock)
    }, 50)

    ws.on('message', (data) => {
      let obj = JSON.parse(data)
      if (obj.type === 'sync') {
        return
      }

      expect(obj).to.have.property('type', 'update')
      expect(obj.data).to.be.an('object')
      expect(obj.data).to.have.property('id', mock.id)
      expect(obj.data).to.have.property('temperature', mock.temperature)
      expect(obj.data).to.have.property('typeId', mock.typeId)
      done()
    })
  })
})
