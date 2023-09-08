// api/schema.ts
import { makeSchema, scalarType } from 'nexus'
import path, { join } from 'path'
import * as types from './graphql'
import { Kind } from 'graphql';

const DateScalar = scalarType({
  name: 'DateTime',
  asNexusMethod: 'datetime',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return value.getTime()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  },
});

export const schema = makeSchema({
  types: [types, DateScalar],
  contextType: {
    module: path.join(__dirname, 'context.ts'),
    export: 'ContextType',
  },

  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'), // 2
    schema: join(__dirname, '..', 'schema.graphql'), // 3
  },
})
