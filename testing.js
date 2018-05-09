const {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const withDefaultFields = require('./');
const SomeBoolean = GraphQLBoolean;
const SomeFloat = GraphQLFloat;
const SomeInt = GraphQLInt;
const SomeList = new GraphQLList(GraphQLString);
const SomeString = GraphQLString;
const SomeObj = new GraphQLObjectType({
    name: 'Obj',
    fields: {
        boolean: {
            type: SomeBoolean
        },
        float: {
            type: SomeFloat
        },
        wrongFloat: {
            type: SomeFloat,
            resolve: () => '10.5'
        },
        int: {
            type: SomeInt
        },
        wrongInt: {
            type: SomeInt,
            resolve: () => '10.5'
        },
        list: {
            type: SomeList
        },
        string: {
            type: SomeString
        }
    }
});
const SomeObjWithDefault = withDefaultFields(SomeObj);
const SomeObjList = new GraphQLList(SomeObj);
const SomeObjListWithDefault = new GraphQLList(SomeObjWithDefault);
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        enum: {
            type: new GraphQLEnumType({
                name: 'Enum',
                values: {
                    zero: {
                        value: 0
                    },
                    one: {
                        value: 1
                    },
                    two: {
                        value: 2
                    }
                }
            })
        },

        boolean: {
            type: SomeBoolean
        },
        booleanWithNull: {
            type: SomeBoolean,
            resolve: () => null
        },
        booleanWithAsyncNull: {
            type: SomeBoolean,
            resolve: () => Promise.resolve(null)
        },
        booleanWithValue: {
            type: SomeBoolean,
            resolve: () => true
        },
        booleanWithAsyncValue: {
            type: SomeBoolean,
            resolve: () => Promise.resolve(true)
        },

        float: {
            type: SomeFloat
        },
        floatWithNull: {
            type: SomeFloat,
            resolve: () => null
        },
        floatWithAsyncNull: {
            type: SomeFloat,
            resolve: () => Promise.resolve(null)
        },
        floatWithValue: {
            type: SomeFloat,
            resolve: () => 10.5
        },
        floatWithAsyncValue: {
            type: SomeFloat,
            resolve: () => Promise.resolve(10.5)
        },

        int: {
            type: SomeInt
        },
        intWithNull: {
            type: SomeInt,
            resolve: () => null
        },
        intWithAsyncNull: {
            type: SomeInt,
            resolve: () => Promise.resolve(null)
        },
        intWithValue: {
            type: SomeInt,
            resolve: () => 10
        },
        intWithAsyncValue: {
            type: SomeInt,
            resolve: () => Promise.resolve(10)
        },

        list: {
            type: SomeList
        },
        listWithNull: {
            type: SomeList,
            resolve: () => null
        },
        listWithAsyncNull: {
            type: SomeList,
            resolve: () => Promise.resolve(null)
        },
        listWithValue: {
            type: SomeList,
            resolve: () => ['a', 'b', 1, 2]
        },
        listWithAsyncValue: {
            type: SomeList,
            resolve: () => Promise.resolve(['a', 'b', 1, 2])
        },

        obj: {
            type: SomeObj
        },
        objWithNull: {
            type: SomeObj,
            resolve: () => null
        },
        objWithAsyncNull: {
            type: SomeObj,
            resolve: () => Promise.resolve(null)
        },
        objWithValue: {
            type: SomeObj,
            resolve: () => ({
                boolean: true,
                float: 10,
                int: 10,
                list: ['a', 'b'],
                string: 'stringValue'
            })
        },
        objWithAsyncValue: {
            type: SomeObj,
            resolve: () => Promise.resolve({
                boolean: true,
                float: 10,
                int: 10,
                list: ['a', 'b'],
                string: 'stringValue'
            })
        },

        objWithDefault: {
            type: SomeObjWithDefault
        },
        objWithDefaultWithNull: {
            type: SomeObjWithDefault,
            resolve: () => null
        },
        objWithDefaultWithAsyncNull: {
            type: SomeObjWithDefault,
            resolve: () => Promise.resolve(null)
        },
        objWithDefaultWithValue: {
            type: SomeObjWithDefault,
            resolve: () => ({
                boolean: true,
                float: 10,
                int: 10,
                list: ['a', 'b'],
                string: 'stringValue'
            })
        },
        objWithDefaultWithAsyncValue: {
            type: SomeObjWithDefault,
            resolve: () => Promise.resolve({
                boolean: true,
                float: 10,
                int: 10,
                list: ['a', 'b'],
                string: 'stringValue'
            })
        },

        objListWithDefault: {
            type: SomeObjListWithDefault
        },
        objListWithDefaultWithNull: {
            type: SomeObjListWithDefault,
            resolve: () => null
        },
        objListWithDefaultWithAsyncNull: {
            type: SomeObjListWithDefault,
            resolve: () => Promise.resolve(null)
        },
        objListWithDefaultWithValue: {
            type: SomeObjListWithDefault,
            resolve: () => [{
                boolean: true,
                float: 10,
                int: 10,
                list: ['a', 'b'],
                string: 'stringValue'
            }]
        },
        objListWithDefaultWithAsyncValue: {
            type: SomeObjListWithDefault,
            resolve: () => Promise.resolve([{
                boolean: true,
                float: 10,
                int: 10,
                list: ['a', 'b'],
                string: 'stringValue'
            }])
        },

        string: {
            type: SomeString
        },
        stringWithNull: {
            type: SomeString,
            resolve: () => null
        },
        stringWithAsyncNull: {
            type: SomeString,
            resolve: () => Promise.resolve(null)
        },
        stringWithValue: {
            type: SomeString,
            resolve: () => 'stringValue'
        },
        stringWithAsyncValue: {
            type: SomeString,
            resolve: () => Promise.resolve('stringValue')
        },

        objList: {
            type: SomeObjList
        },
        objListWithNull: {
            type: SomeObjList,
            resolve: () => null
        },
        objListWithAsyncNull: {
            type: SomeObjList,
            resolve: () => Promise.resolve(null)
        },
        objListWithValue: {
            type: SomeObjList,
            resolve: () => [{
                boolean: true,
                float: 10,
                int: 10,
                list: ['a', 'b'],
                string: 'stringValue'
            }]
        },
        objListWithAsyncValue: {
            type: SomeObjList,
            resolve: () => Promise.resolve([{
                boolean: true,
                float: 10,
                int: 10,
                list: ['a', 'b'],
                string: 'stringValue'
            }])
        },
    }
});

module.exports = Query;