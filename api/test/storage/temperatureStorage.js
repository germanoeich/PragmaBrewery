/* eslint no-unused-expressions:0 */
import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import getTemperatureStorage, { TemperatureStorage } from '../../src/storage/temperatureStorage'

const mockData = [
  { id: 1, temperature: 4, typeId: 1 },
  { id: 2, temperature: 6, typeId: 2 }
]

describe('#storage - Temperature', () => {
  it('Should exist', () => {
    expect(TemperatureStorage).to.be.a('function')
  })

  it('Should return the same singleton everytime', () => {
    expect(getTemperatureStorage()).to.be.equal(getTemperatureStorage())
  })

  it('Should have method getData', () => {
    const storage = new TemperatureStorage()
    expect(storage.getData).to.be.a('function')
  })

  it('Should return data', () => {
    const storage = new TemperatureStorage()
    storage.data = mockData
    expect(storage.getData()).to.be.an('array').and.not.empty
  })

  it('Should have method upsertData', () => {
    const storage = new TemperatureStorage()
    expect(storage.upsertData).to.be.a('function')
  })

  it('Should insert new data with upsertData', () => {
    const storage = new TemperatureStorage()
    storage.data = mockData

    let mock = { id: Number.MAX_VALUE, name: 'Test' }
    storage.upsertData(Object.assign({}, mock))

    const data = storage.getData()
    expect(data.some((item) => item.id === mock.id && item.name === mock.name)).to.be.true
  })

  it('Should update data with upsertData', () => {
    const storage = new TemperatureStorage()
    storage.data = mockData

    const data = storage.data[0]
    data.name = 'Test'
    storage.upsertData(data)
    const updatedData = storage.data[0]
    expect(updatedData).to.have.property('name').equal('Test')
  })
})
