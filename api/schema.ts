// api/schema.ts
import np_scalars from "nexus-prisma/scalars";
import { makeSchema, scalarType } from "nexus";
import path, { join } from "path";
import * as _all_ts from "./graphql";
import { Kind } from "graphql";

const DateScalar = scalarType({
  name: "DateTime",
  asNexusMethod: "datetime",
  description: "Date custom scalar type",
  parseValue(value: any) {
    return new Date(value);
  },
  serialize(value: any) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});
export const schema = makeSchema({
  types: [_all_ts, np_scalars, DateScalar],
  contextType: {
    module: path.join(__dirname, "context.ts"),
    export: "ContextType",
  },

  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"), // 2
    schema: join(__dirname, "..", "schema.graphql"), // 3
  },
});
