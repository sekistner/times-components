import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { printSchema, buildClientSchema } from "graphql/utilities";
import { GraphQLScalarType, Kind } from "graphql";

// const definition = new GraphQLScalarType({
//   name: "Slug",
//   serialize: value => value,
//   parseValue: value => value,
//   parseLiteral: value => {
//     if(value !== Kind.STRING) {
//       throw new Error('you have provided the wrong type');
//     }
//     return () => value;}
// });

export default ({ data: { __schema } }) => ({
  types: defaultTypes,
  values: defaultValues
} = {}) => {
  
  // console.log('this is the default types', defaultTypes.String());
  // console.log('this is the default types', typeof defaultTypes);
  // console.log('this is our type thing', typeof definition);
  // console.log('this is our type thing', definition);

  const schemaSDL = printSchema(buildClientSchema({ __schema }));

  const schema = makeExecutableSchema({
    resolvers: {
      Query: {
        ...defaultValues
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    typeDefs: schemaSDL
  });

  addMockFunctionsToSchema({
    mocks: {
      ...defaultTypes
    },
    preserveResolvers: true,
    schema
  });
  
  return schema;
};
