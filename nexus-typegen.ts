/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { ContextType } from "./api/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  createEventArgs: { // input type
    ai_image_keywords: string[]; // [String!]!
    description: string; // String!
    end: string; // String!
    keywords: string[]; // [String!]!
    location?: number | null; // Int
    office: string; // String!
    start: string; // String!
    title: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Event: { // root type
    Description: string; // String!
    Title: string; // String!
    ai_description?: string | null; // String
    ai_image_style_tags: string[]; // [String!]!
    ai_title?: string | null; // String
    end: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    keywords: string[]; // [String!]!
    start: NexusGenScalars['DateTime']; // DateTime!
  }
  Location: { // root type
    id: number; // Int!
    office: string; // String!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    id: number; // Int!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Event: { // field return type
    Description: string; // String!
    Title: string; // String!
    ai_description: string | null; // String
    ai_image_style_tags: string[]; // [String!]!
    ai_title: string | null; // String
    end: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    keywords: string[]; // [String!]!
    location: NexusGenRootTypes['Location'] | null; // Location
    start: NexusGenScalars['DateTime']; // DateTime!
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Location: { // field return type
    id: number; // Int!
    office: string; // String!
  }
  Mutation: { // field return type
    EventJoin: NexusGenRootTypes['Event'] | null; // Event
    EventLeave: NexusGenRootTypes['Event'] | null; // Event
    LocationCreate: NexusGenRootTypes['Location'] | null; // Location
    LocationDelete: NexusGenRootTypes['Location'] | null; // Location
    UserCreate: NexusGenRootTypes['User'] | null; // User
    createEvent: NexusGenRootTypes['Event'] | null; // Event
    deleteEvent: NexusGenRootTypes['Event'] | null; // Event
    updateEvent: NexusGenRootTypes['Event'] | null; // Event
  }
  Query: { // field return type
    event: NexusGenRootTypes['Event'] | null; // Event
    eventCreateDescription: string | null; // String
    eventCreateImage: string | null; // String
    eventHypeText: string | null; // String
    events: NexusGenRootTypes['Event'][]; // [Event!]!
    location: NexusGenRootTypes['Location'] | null; // Location
    locations: Array<NexusGenRootTypes['Location'] | null> | null; // [Location]
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  User: { // field return type
    id: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  Event: { // field return type name
    Description: 'String'
    Title: 'String'
    ai_description: 'String'
    ai_image_style_tags: 'String'
    ai_title: 'String'
    end: 'DateTime'
    id: 'Int'
    keywords: 'String'
    location: 'Location'
    start: 'DateTime'
    users: 'User'
  }
  Location: { // field return type name
    id: 'Int'
    office: 'String'
  }
  Mutation: { // field return type name
    EventJoin: 'Event'
    EventLeave: 'Event'
    LocationCreate: 'Location'
    LocationDelete: 'Location'
    UserCreate: 'User'
    createEvent: 'Event'
    deleteEvent: 'Event'
    updateEvent: 'Event'
  }
  Query: { // field return type name
    event: 'Event'
    eventCreateDescription: 'String'
    eventCreateImage: 'String'
    eventHypeText: 'String'
    events: 'Event'
    location: 'Location'
    locations: 'Location'
    user: 'User'
    users: 'User'
  }
  User: { // field return type name
    id: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    EventJoin: { // args
      eventId: number; // Int!
      userId: number; // Int!
    }
    EventLeave: { // args
      eventId: number; // Int!
      userId: number; // Int!
    }
    LocationCreate: { // args
      office: string; // String!
    }
    LocationDelete: { // args
      id: number; // Int!
    }
    UserCreate: { // args
      email: string; // String!
      name?: string | null; // String
    }
    createEvent: { // args
      arg: NexusGenInputs['createEventArgs']; // createEventArgs!
    }
    deleteEvent: { // args
      id: number; // Int!
    }
    updateEvent: { // args
      data: NexusGenInputs['createEventArgs']; // createEventArgs!
      id: number; // Int!
    }
  }
  Query: {
    event: { // args
      id: number; // Int!
    }
    eventCreateDescription: { // args
      id: number; // Int!
    }
    eventCreateImage: { // args
      force_update: boolean; // Boolean!
      id: number; // Int!
    }
    eventHypeText: { // args
      id: number; // Int!
    }
    location: { // args
      id: number; // Int!
    }
    user: { // args
      id: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: ContextType;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}