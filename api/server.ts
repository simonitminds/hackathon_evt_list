// api/server.ts
import { ApolloServer, BaseContext } from '@apollo/server'
import { schema } from './schema'
import { ContextType } from './context'

export const server = new ApolloServer<BaseContext & ContextType>({ schema })
