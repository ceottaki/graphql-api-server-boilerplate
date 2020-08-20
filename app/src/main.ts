import { App } from './app'
// import { Utils } from './utils'

// Reads the port to open from the environment.
const port: number = parseInt(process.env.PORT || '5050')
// Utils.readSecret('externalApiToken').then(
//   (externalApiToken: string) => {
// Creates the app and starts it.
const app: App = new App('Boilerplate', port)
// app.addQueryFieldCollection(new SomeCollectionOfQueries(externalApiToken))
app.start()
//   },
//   (reason: unknown) => {
//     console.error(reason)
//   }
// )
