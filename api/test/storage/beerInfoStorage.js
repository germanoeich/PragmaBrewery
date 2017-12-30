/* eslint no-unused-expressions:0 */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import getBeerInfoStorage, { BeerInfoStorage } from '../../src/storage/beerInfoStorage'

describe('#storage - BeerInfo', () => {
  it('Should exist', () => {
    expect(BeerInfoStorage).to.be.a('function')
  })

  it('Should return the same singleton everytime', () => {
    expect(getBeerInfoStorage()).to.be.equal(getBeerInfoStorage())
  })

  it('Should have method getData', () => {
    const storage = new BeerInfoStorage()
    expect(storage.getData).to.be.a('function')
  })

  it('Should return data', () => {
    const storage = new BeerInfoStorage()
    expect(storage.getData()).to.be.an('array').and.not.empty
  })

  it('Should have method getById', () => {
    const storage = new BeerInfoStorage()
    expect(storage.getById).to.be.a('function')
  })

  it('Should return correct data when queried by Id', () => {
    const storage = new BeerInfoStorage()
    storage.data = [{ id: 23 }, { id: 56 }]

    expect(storage.getById(23)).to.be.an('object')
    expect(storage.getById(56)).to.be.an('object')
    expect(storage.getById(99999)).to.be.undefined
  })
})
