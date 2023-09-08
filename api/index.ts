// api/index.ts
import { PrismaClient } from '@prisma/client'
import { server } from './server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ContextType } from './context'


const context: ContextType = {
  db: new PrismaClient()
};

startStandaloneServer(server, {
  context: async () => context,
  listen: { port: 4000, host: '0.0.0.0' }
}).then(e => console.log(e))
