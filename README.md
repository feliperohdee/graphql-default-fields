# GraphQL Default Fields

It normalizes graphql fields to return "zero valued" values when inexistent.

## Usage

            const graphql = require('graphql');
            const withDefaults = require('graphql-default-fields')(graphql.GraphQLObjectType);
            
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
                objectDefault: {
                    boolean: true
                },
                fields: {
                    boolean: {
                        type: GraphQLBoolean,
                        fieldDefault: true
                    },
                    float: {
                        type: GraphQLFloat,
                        fieldDefault: 10.5
                    },
                    int: {
                        type: GraphQLInt,
                        fieldDefault: 10
                    },
                    list: {
                        type: new GraphQLList(GraphQLString),
                        fieldDefault: ['string']
                    },
                    string: {
                        type: GraphQLString,
                        fieldDefault: 'string'
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
