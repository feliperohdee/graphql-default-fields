[![CircleCI](https://circleci.com/gh/feliperohdee/smallorange-graphql-default-fields.svg?style=svg)](https://circleci.com/gh/feliperohdee/smallorange-graphql-default-fields)

# Small Orange GraphQL Default Fields

Normalizes graphql fields to return "zero valued" values when inexistent.

## Usage

            const withDefaultFields = require('smallorange-graphql-default-fields');
            const Obj = new GraphQLObjectType({
                name: 'Obj',
                fields: {
                    boolean: {
                        type: GraphQLBoolean
                    },
                    float: {
                        type: GraphQLFloat
                    },
                    int: {
                        type: GraphQLInt
                    },
                    list: {
                        type: new GraphQLList(GraphQLString)
                    },
                    string: {
                        type: GraphQLString
                    }
                }
            });

            const ObjWithDefault = withDefaultFields(Obj, /* deep: false, reald: typeof GraphQLObjectType */);

            // without any values, "Obj" is going return:
            {
                boolean: null,
                float: null,
                int: null,
                list: null,
                string: null
            }

            // without any values, "ObjWithDefault" is going return:
            {
                boolean: false,
                float: 0,
                int: 0,
                list: [],
                string: ''
            }