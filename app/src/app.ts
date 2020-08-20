import GraphQLServerOptions from 'apollo-server-core/dist/graphqlOptions'
import { graphiqlRestify, graphqlRestify } from 'apollo-server-restify'
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import * as restify from 'restify'

import { IQueryFieldCollection } from './types/query-field-collection'

export class App {
  private server: restify.Server
  private queryGraphQLType: GraphQLObjectType
  private mutationGraphQLType: GraphQLObjectType
  public readonly port: number

  constructor(name: string, port: number) {
    this.port = port
    this.server = restify.createServer({
      name,
      version: '1.0.0'
    })

    this.queryGraphQLType = new GraphQLObjectType({
      name: 'Query',
      fields: {
        heartBeat: {
          type: GraphQLDateTime,
          description: 'A simple check that returns the server date and time.',
          resolve: () => new Date()
        }
      }
    })

    this.mutationGraphQLType = new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        noop: {
          type: GraphQLString,
          description: 'A non-operation, always returns an empty string.',
          resolve: () => ''
        }
      }
    })
  }

  public start(): void {
    console.log('Configuring GraphQL server...')
    const schema = new GraphQLSchema({
      query: this.queryGraphQLType,
      mutation: this.mutationGraphQLType
    })
    const graphQLOptions: GraphQLServerOptions = { schema }

    this.server.use(restify.plugins.bodyParser())
    this.server.use(restify.plugins.queryParser())

    this.server.post('/graphql', graphqlRestify(graphQLOptions))
    this.server.get('/graphql', graphqlRestify(graphQLOptions))

    this.server.get('/graphiql', graphiqlRestify({ endpointURL: '/graphql' }))

    console.log('Application starting on port ' + this.port.toString() + '...')

    this.server.listen(this.port, () => {
      console.log(`Application started and is listening on port ${this.port}.`)
      console.log(`Open http://localhost:${this.port}/graphiql to start running queries`)
      console.log(`or use the endpoint http://localhost:${this.port}/graphql in your API.`)
    })
  }

  public addQueryFieldCollection(
    queryFieldCollection: IQueryFieldCollection<unknown, unknown>
  ): void {
    const newConfig = this.queryGraphQLType.toConfig()
    newConfig.fields = { ...newConfig.fields, ...queryFieldCollection.queryFields }
    this.queryGraphQLType = new GraphQLObjectType(newConfig)

    if (queryFieldCollection.mutationFields) {
      const newMutationConfig = this.mutationGraphQLType.toConfig()
      newMutationConfig.fields = {
        ...newMutationConfig.fields,
        ...queryFieldCollection.mutationFields
      }

      this.mutationGraphQLType = new GraphQLObjectType(newMutationConfig)
    }
  }
}
