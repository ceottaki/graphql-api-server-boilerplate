import { GraphQLFloat, GraphQLFieldConfigMap, GraphQLString, Thunk } from 'graphql'
import * as fetch from 'isomorphic-fetch'

import { IGraphQLDefaultArgs } from '../types/graphql-default-args'
import { IQueryFieldCollection } from '../types/query-field-collection'
import { weatherGraphQLType } from './weather-graphql-type'

interface IWeatherArgs {
  lat: number
  lon: number
  unitSystem: string
}

export class Weather implements IQueryFieldCollection<unknown, unknown> {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private fetchWeather = async (
    lat: number = 51.476853,
    lon: number = -0.0026889,
    unitSystem: string = 'si'
  ) => {
    // eslint-disable-next-line max-len
    const weatherUrl = `https://api.climacell.co/v3/weather/realtime?apikey=${this.apiKey}&lat=${lat}&lon=${lon}&unit_system=${unitSystem}&fields=precipitation,wind_gust,wind_speed,wind_direction,temp`
    const weatherResponse = await fetch(weatherUrl)
    if (weatherResponse.status !== 200) {
      throw new Error(
        // eslint-disable-next-line max-len
        `There was a problem fetching the weather. ${weatherResponse.status} ${weatherResponse.statusText}`
      )
    }

    const weather = await weatherResponse.json()
    return weather
  }

  private weatherResolver = async (_source: unknown, args: IGraphQLDefaultArgs) => {
    const { lat, lon, unitSystem } = (args as unknown) as IWeatherArgs
    const weather = await this.fetchWeather(lat, lon, unitSystem)

    return weather
  }

  queryFields: Thunk<GraphQLFieldConfigMap<unknown, unknown>> = {
    weather: {
      type: weatherGraphQLType,
      args: {
        lat: { type: GraphQLFloat, defaultValue: 51.476853 },
        lon: { type: GraphQLFloat, defaultValue: -0.0026889 },
        unitSystem: { type: GraphQLString, defaultValue: 'si' }
      },
      resolve: this.weatherResolver
    }
  }
}
