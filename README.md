[![CircleCI](https://circleci.com/gh/feliperohdee/smallorange-graphql-default-fields.svg?style=svg)](https://circleci.com/gh/feliperohdee/smallorange-graphql-default-fields)

# Small Orange GraphQL Default Fields

Normalizes graphql fields to return "zero valued" values when inexistent.

## Usage

            const graphql = require('graphql');
            const withDefaults = require('smallorange-graphql-default-fields')(graphql.GraphQLObjectType);
            
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

            // without any values, "Obj" is going return:
            {
                boolean: null,
                float: null,
                int: null,
                list: null,
                string: null
            }
            
            const ObjWithDefaults = new withDefaults.GraphQLObjectType({
                name: 'ObjWithDefaults',
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

            // without any values, "ObjWithDefaults" is going return:
            {
                boolean: false,
                float: 0,
                int: 0,
                list: [],
                string: ''
            }
