// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { TypeDefs as typeDefs, type Resolvers } from '@/gql/graphql'
import { createSchema, createYoga } from 'graphql-yoga'

interface NextContext {
    params: Promise<Record<string, string>>
}

const resolvers: Resolvers = {
    Query: {},
}

const { handleRequest } = createYoga<NextContext>({
    schema: createSchema({
        typeDefs,
        resolvers,
    }),

    // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
    graphqlEndpoint: '/api/graphql',

    // Yoga needs to know how to create a valid Next response
    fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as OPTIONS, handleRequest as POST }
