import express from 'express'
import WebSocket from 'ws'
import http from 'http'
import setupRoutes from './routes'
import setupWebSocket from './socket'
import bodyParser from 'body-parser'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

setupRoutes(app)
app.listen(3001, () => console.log('API Listening on port 3001!'))

setupWebSocket(wss)
server.listen(8080, () => console.log('WS Listening on 8080'))

export default app
