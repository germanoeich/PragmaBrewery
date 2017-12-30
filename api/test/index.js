import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from './../src/index'
chai.use(chaiHttp)

describe('#express app', () => {
  it('Should be a function', () => {
    expect(app).to.be.a('function')
  })

  it('Should have an endpoint for /temperatures', async () => {
    const response = await chai.request(app).get('/temperatures')
    expect(response).to.have.status(200)
  })
})
