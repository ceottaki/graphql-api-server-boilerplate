import * as dotenv from 'dotenv'

import { App } from './app'
import { Utils } from './utils'
import { Weather } from './weather/weather'

dotenv.config()

// Reads the port to open from the environment.
const port: number = parseInt(process.env.PORT || '5050')
Utils.readSecret('weatherApiToken').then(
  (weatherApiToken: string) => {
    // Creates the app and starts it.
    const app: App = new App('Boilerplate', port)
    app.addQueryFieldCollection(new Weather(weatherApiToken))
    app.start()
  },
  (reason: unknown) => {
    console.error(reason)
  }
)
