import { readFile, writeFile } from 'fs'
import { join as pathJoin } from 'path'

/**
 * Represents a series of static utility functions.
 *
 * @export
 * @class Utils
 */
export class Utils {
  /**
   * Saves a given object to a JSON file with the given file name.
   *
   * @private
   * @param {object} obj The object to be saved.
   * @param {string} fileName The name of the file where the object should be saved.
   * @memberof Utils
   */
  public static saveObjectToJsonFile(obj: object, fileName: string): void {
    if (!obj || !fileName) {
      return
    }

    const jsonContent = JSON.stringify(obj)
    writeFile(fileName, jsonContent, 'utf8', (err) => {
      if (err) {
        console.error('An error occurred while saving a JSON object to a file:')
        console.error(err)
      }
    })
  }

  public static async readJsonFileToObject(fileName: string): Promise<object> {
    if (!fileName) {
      return {}
    }

    const result = new Promise<object>((resolve, reject) => {
      readFile(fileName, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err || !data) {
          console.error(`An error occurred while reading file ${fileName}.`)
          reject(`Error reading file ${fileName}.`)
        }

        if (!data) {
          resolve({})
        }

        let parsedObject
        try {
          parsedObject = JSON.parse(data.trim())
          resolve(parsedObject)
        } catch (error) {
          console.error(
            `There was an error parsing the contents of file ${fileName} into an object.`,
            error
          )
          reject(`There was an error parsing the contents of file ${fileName} into an object.`)
        }
      })
    })

    return result
  }

  /**
   * Reads a secret from the environment, first attempting to read a Docker secret from
   * /run/secrets and if that is not available, then it attempts to read an environment variable.
   *
   * @static
   * @param {string} secretName The name of the secret to be read.
   * @returns {Promise<string>} Resolves into the contents of the secret or rejects if not defined.
   * @memberof Utils
   */
  public static async readSecret(secretName: string): Promise<string> {
    const result = new Promise<string>((resolve, reject) => {
      readFile(
        pathJoin('/run/secrets/', secretName),
        'utf8',
        (err: NodeJS.ErrnoException | null, data: string) => {
          if (err || !data) {
            if (process.env[secretName]) {
              resolve(process.env[secretName])
            } else {
              console.error(`An error occurred while reading secret ${secretName}.`)
              console.error(
                'Secret file is not available and ' +
                  'no environment variable with the same name has been defined.'
              )

              reject(`Secret ${secretName} is not defined.`)
            }
          }

          resolve(data ? data.trim() : '')
        }
      )
    })

    return result
  }
}
