import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
   schema: 'schema.graphql',
   generates: {
      'src/gql/': {
        preset: 'client',
        plugins: ['typescript-operations','typescript-resolvers', 'typescript-typedefs']
      },
   }
}
export default config