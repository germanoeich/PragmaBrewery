import temperatures from './temperatures'

const setupRoutes = (app) => {
  app.get('/temperatures', temperatures.getTemperatures)
  app.put('/temperatures', temperatures.putTemperatures)
}

export default setupRoutes
