const _ = require('lodash');
const {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLScalarType,
    GraphQLString,
} = require('graphql');
const {
    Kind
} = require('graphql/language');

const withDefaults = require('./')();

function parseLiteral(ast) {
    switch (ast.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return ast.value;
        case Kind.INT:
        case Kind.FLOAT:
            return parseFloat(ast.value);
        case Kind.OBJECT: {
                const value = {};

                ast.fields.forEach((field) => {
                    value[field.name.value] = parseLiteral(field.value);
                });

                return value;
            }
        case Kind.LIST:
            return ast.values.map(parseLiteral);
        default:
            return null;
    }
}

const identity = value => {
    if(_.isEmpty(value)) {
        return null;
    }

    return value;
};

const Json = new GraphQLScalarType({
    name: 'Json',
    description: 'The `Json` scalar type represents JSON values as specified by ' +
        '[ECMA-404](http://www.ecma-international.org/' +
        'publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: identity,
    parseValue: identity,
    parseLiteral
});

const fields = {
    boolean: {
        type: GraphQLBoolean
    },
    booleanWithDefault: {
        type: GraphQLBoolean,
        defaultValue: true
    },
    float: {
        type: GraphQLFloat
    },
    floatWithDefault: {
        type: GraphQLFloat,
        defaultValue: 10.5
    },
    wrongFloat: {
        type: GraphQLFloat,
        resolve: () => '10.5'
    },
    wrongFloatWithDefault: {
        type: GraphQLFloat,
        resolve: () => '10.5',
        defaultValue: 10.5
    },
    int: {
        type: GraphQLInt
    },
    intWithDefault: {
        type: GraphQLInt,
        defaultValue: 10
    },
    wrongInt: {
        type: GraphQLInt,
        resolve: () => '10.5'
    },
    wrongIntWithDefault: {
        type: GraphQLInt,
        resolve: () => '10.5',
        defaultValue: 10
    },
    json: {
        type: Json
    },
    jsonWithDefault: {
        type: Json,
        defaultValue: {
            json: 'json'
        }
    },
    list: {
        type: new GraphQLList(GraphQLString)
    },
    listWithDefault: {
        type: new GraphQLList(GraphQLString),
        defaultValue: ['string']
    },
    string: {
        type: GraphQLString
    },
    stringWithDefault: {
        type: GraphQLString,
        defaultValue: 'stringValue'
    }
};

const getObj = name => new GraphQLObjectType({
    name,
    fields
});

const getDefaultObj = name => new withDefaults.GraphQLObjectType({
    name,
    fields
});

const SomeObj = getObj('Obj');
const SomeObjWithDefault = getDefaultObj('DefaultObj');
const SomeObjList = new GraphQLList(SomeObj);
const SomeObjListWithDefault = new GraphQLList(SomeObjWithDefault);
const Query = new withDefaults.GraphQLObjectType({
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
            type: GraphQLBoolean
        },
        booleanWithDefault: {
            type: GraphQLBoolean,
            defaultValue: true
        },
        booleanWithNull: {
            type: GraphQLBoolean,
            resolve: () => null
        },
        booleanWithAsyncNull: {
            type: GraphQLBoolean,
            resolve: () => Promise.resolve(null)
        },
        booleanWithValue: {
            type: GraphQLBoolean,
            resolve: () => true
        },
        booleanWithAsyncValue: {
            type: GraphQLBoolean,
            resolve: () => Promise.resolve(true)
        },

        float: {
            type: GraphQLFloat
        },
        floatWithDefault: {
            type: GraphQLFloat,
            defaultValue: 10.5
        },
        floatWithNull: {
            type: GraphQLFloat,
            resolve: () => null
        },
        floatWithAsyncNull: {
            type: GraphQLFloat,
            resolve: () => Promise.resolve(null)
        },
        floatWithValue: {
            type: GraphQLFloat,
            resolve: () => 10.5
        },
        floatWithAsyncValue: {
            type: GraphQLFloat,
            resolve: () => Promise.resolve(10.5)
        },

        int: {
            type: GraphQLInt
        },
        intWithDefault: {
            type: GraphQLInt,
            defaultValue: 10
        },
        intWithNull: {
            type: GraphQLInt,
            resolve: () => null
        },
        intWithAsyncNull: {
            type: GraphQLInt,
            resolve: () => Promise.resolve(null)
        },
        intWithValue: {
            type: GraphQLInt,
            resolve: () => 10
        },
        intWithAsyncValue: {
            type: GraphQLInt,
            resolve: () => Promise.resolve(10)
        },
        
        json: {
            type: Json
        },
        jsonWithDefault: {
            type: Json,
            defaultValue: {
                json: 'json'
            }
        },
        jsonWithNull: {
            type: Json,
            resolve: () => null
        },
        jsonWithAsyncNull: {
            type: Json,
            resolve: () => Promise.resolve(null)
        },
        jsonWithValue: {
            type: Json,
            resolve: () => ({
                json: 'json'
            })
        },
        jsonWithAsyncValue: {
            type: Json,
            resolve: () => Promise.resolve({
                json: 'json'
            })
        },

        list: {
            type: new GraphQLList(GraphQLString)
        },
        listWithDefault: {
            type: new GraphQLList(GraphQLString),
            defaultValue: ['string']
        },
        listWithNull: {
            type: new GraphQLList(GraphQLString),
            resolve: () => null
        },
        listWithAsyncNull: {
            type: new GraphQLList(GraphQLString),
            resolve: () => Promise.resolve(null)
        },
        listWithValue: {
            type: new GraphQLList(GraphQLString),
            resolve: () => ['a', 'b', 1, 2]
        },
        listWithAsyncValue: {
            type: new GraphQLList(GraphQLString),
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
                json: {
                    json: 'jsonValue'
                },
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
                json: {
                    json: 'jsonValue'
                },
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
                json: {
                    json: 'jsonValue'
                },
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
                json: {
                    json: 'jsonValue'
                },
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
                json: {
                    json: 'jsonValue'
                },
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
                json: {
                    json: 'jsonValue'
                },
                list: ['a', 'b'],
                string: 'stringValue'
            }])
        },

        string: {
            type: GraphQLString
        },
        stringWithDefault: {
            type: GraphQLString,
            defaultValue: 'stringValue'
        },
        stringWithNull: {
            type: GraphQLString,
            resolve: () => null
        },
        stringWithAsyncNull: {
            type: GraphQLString,
            resolve: () => Promise.resolve(null)
        },
        stringWithValue: {
            type: GraphQLString,
            resolve: () => 'stringValue'
        },
        stringWithAsyncValue: {
            type: GraphQLString,
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
                json: {
                    json: 'jsonValue'
                },
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
                json: {
                    json: 'jsonValue'
                },
                list: ['a', 'b'],
                string: 'stringValue'
            }])
        }
    }
});

module.exports = Query;