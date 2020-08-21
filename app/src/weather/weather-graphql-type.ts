import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

const observationGraphQLType = new GraphQLObjectType({
  name: 'Observation',
  fields: {
    value: { type: GraphQLFloat },
    units: { type: GraphQLString }
  }
})

const observationTimeGraphQLType = new GraphQLObjectType({
  name: 'ObservationTime',
  fields: {
    value: {
      type: GraphQLDateTime
    }
  }
})

export const weatherGraphQLType = new GraphQLObjectType({
  name: 'Weather',
  fields: {
    lat: { type: GraphQLFloat },
    lon: { type: GraphQLFloat },
    temp: { type: observationGraphQLType },
    wind_speed: { type: observationGraphQLType },
    wind_gust: { type: observationGraphQLType },
    wind_direction: { type: observationGraphQLType },
    precipitation: { type: observationGraphQLType },
    observation_time: {
      type: observationTimeGraphQLType
    }
  }
})
