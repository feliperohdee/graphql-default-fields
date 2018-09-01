const _ = require('lodash');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    graphql
} = require('graphql');

const expect = chai.expect;
const withDefaults = require('./')();
const Query = require('./testing');

chai.use(sinonChai);

describe('index.js', () => {
    let cache;
    let cached = Symbol;

    beforeEach(() => {
        sinon.spy(_, 'extend');
        cache = {
            get: sinon.stub()
                .onFirstCall()
                .returns(null)
                .returns(cached),
            set: sinon.stub(),
        };
    });

    afterEach(() => {
        _.extend.restore();
    });

    it('should let __withDefaults for each field', () => {
        expect(_.every(Query.getFields(), field => field.__withDefaults === true)).to.be.true;
    });

    it('should prevent when __preventDefaults', () => {
        const newQuery = new withDefaults.GraphQLObjectType({
            name: 'Prevented',
            fields: {
                string: {
                    __preventDefaults: true,
                    type: GraphQLString
                }
            }
        });

        expect(_.every(newQuery.getFields(), field => !field.__withDefaults)).to.be.true;
    });

    it('should match complex object', done => {
        const schema = new GraphQLSchema({
            query: Query
        });

        graphql({
                schema,
                source: `{
                    enum 

                    boolean
                    booleanWithDefault
                    booleanWithNull
                    booleanWithAsyncNull
                    booleanWithValue
                    booleanWithAsyncValue

                    float
                    floatWithDefault
                    floatWithNull
                    floatWithAsyncNull
                    floatWithValue
                    floatWithAsyncValue

                    int
                    intWithDefault
                    intWithNull
                    intWithAsyncNull
                    intWithValue
                    intWithAsyncValue
                    
                    json
                    jsonWithDefault
                    jsonWithNull
                    jsonWithAsyncNull
                    jsonWithValue
                    jsonWithAsyncValue

                    list
                    listWithDefault
                    listWithNull
                    listWithAsyncNull
                    listWithValue
                    listWithAsyncValue

                    obj {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objWithNull {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objWithAsyncNull {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objWithValue {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objWithAsyncValue {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    
                    objWithDefault {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        wrongFloat
                        wrongFloatWithDefault
                        int
                        intWithDefault
                        wrongInt
                        wrongIntWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objWithDefaultWithNull {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        wrongFloat
                        wrongFloatWithDefault
                        int
                        intWithDefault
                        wrongInt
                        wrongIntWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objWithDefaultWithAsyncNull {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        wrongFloat
                        wrongFloatWithDefault
                        int
                        intWithDefault
                        wrongInt
                        wrongIntWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objWithDefaultWithValue {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        wrongFloat
                        wrongFloatWithDefault
                        int
                        intWithDefault
                        wrongInt
                        wrongIntWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objWithDefaultWithAsyncValue {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        wrongFloat
                        wrongFloatWithDefault
                        int
                        intWithDefault
                        wrongInt
                        wrongIntWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }

                    objListWithAsyncNull {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objListWithValue {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objListWithAsyncValue {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    
                    objListWithDefault {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objListWithDefaultWithNull {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objListWithDefaultWithAsyncNull {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objListWithDefaultWithValue {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }
                    objListWithDefaultWithAsyncValue {
                        boolean
                        booleanWithDefault
                        float
                        floatWithDefault
                        int
                        intWithDefault
                        json
                        jsonWithDefault
                        list
                        listWithDefault
                        string
                        stringWithDefault
                    }

                    string
                    stringWithDefault
                    stringWithNull
                    stringWithAsyncNull
                    stringWithValue
                    stringWithAsyncValue
                }`
            })
            .then(response => {
                expect(response).to.deep.equal({
                    data: {
                        enum: null,
                        boolean: false,
                        booleanWithNull: false,
                        booleanWithAsyncNull: false,
                        booleanWithValue: true,
                        booleanWithAsyncValue: true,
                        booleanWithDefault: true,
                        float: 0,
                        floatWithNull: 0,
                        floatWithAsyncNull: 0,
                        floatWithValue: 10.5,
                        floatWithAsyncValue: 10.5,
                        floatWithDefault: 10.5,
                        int: 0,
                        intWithNull: 0,
                        intWithAsyncNull: 0,
                        intWithValue: 10,
                        intWithAsyncValue: 10,
                        intWithDefault: 10,
                        json: null,
                        jsonWithNull: null,
                        jsonWithAsyncNull: null,
                        jsonWithValue: {
                            json: 'json'
                        },
                        jsonWithAsyncValue: {
                            json: 'json'
                        },
                        jsonWithDefault: {
                            json: 'json'
                        },
                        list: [],
                        listWithNull: [],
                        listWithAsyncNull: [],
                        listWithValue: [
                            'a',
                            'b',
                            '1',
                            '2'
                        ],
                        listWithAsyncValue: [
                            'a',
                            'b',
                            '1',
                            '2'
                        ],
                        listWithDefault: [
                            'string'
                        ],
                        obj: {
                            boolean: null,
                            booleanWithDefault: null,
                            float: null,
                            floatWithDefault: null,
                            int: null,
                            intWithDefault: null,
                            json: null,
                            jsonWithDefault: null,
                            list: null,
                            listWithDefault: null,
                            string: null,
                            stringWithDefault: null
                        },
                        objWithNull: {
                            boolean: null,
                            booleanWithDefault: null,
                            float: null,
                            floatWithDefault: null,
                            int: null,
                            intWithDefault: null,
                            json: null,
                            jsonWithDefault: null,
                            list: null,
                            listWithDefault: null,
                            string: null,
                            stringWithDefault: null
                        },
                        objWithAsyncNull: {
                            boolean: null,
                            booleanWithDefault: null,
                            float: null,
                            floatWithDefault: null,
                            int: null,
                            intWithDefault: null,
                            json: null,
                            jsonWithDefault: null,
                            list: null,
                            listWithDefault: null,
                            string: null,
                            stringWithDefault: null
                        },
                        objWithValue: {
                            boolean: true,
                            booleanWithDefault: null,
                            float: 10,
                            floatWithDefault: null,
                            int: 10,
                            intWithDefault: null,
                            json: {
                                json: 'jsonValue'
                            },
                            jsonWithDefault: null,
                            list: ['a', 'b'],
                            listWithDefault: null,
                            string: 'stringValue',
                            stringWithDefault: null
                        },
                        objWithAsyncValue: {
                            boolean: true,
                            booleanWithDefault: null,
                            float: 10,
                            floatWithDefault: null,
                            int: 10,
                            intWithDefault: null,
                            json: {
                                json: 'jsonValue'
                            },
                            jsonWithDefault: null,
                            list: ['a', 'b'],
                            listWithDefault: null,
                            string: 'stringValue',
                            stringWithDefault: null
                        },
                        objWithDefault: {
                            boolean: false,
                            booleanWithDefault: true,
                            float: 0,
                            floatWithDefault: 10.5,
                            wrongFloat: 0,
                            wrongFloatWithDefault: 10.5,
                            int: 0,
                            wrongInt: 0,
                            intWithDefault: 10,
                            wrongIntWithDefault: 10,
                            json: null,
                            jsonWithDefault: {
                                json: 'json'
                            },
                            list: [],
                            listWithDefault: ['string'],
                            string: '',
                            stringWithDefault: 'stringValue'
                        },
                        objWithDefaultWithNull: {
                            boolean: false,
                            booleanWithDefault: true,
                            float: 0,
                            floatWithDefault: 10.5,
                            wrongFloat: 0,
                            wrongFloatWithDefault: 10.5,
                            int: 0,
                            wrongInt: 0,
                            intWithDefault: 10,
                            wrongIntWithDefault: 10,
                            json: null,
                            jsonWithDefault: {
                                json: 'json'
                            },
                            list: [],
                            listWithDefault: ['string'],
                            string: '',
                            stringWithDefault: 'stringValue'
                        },
                        objWithDefaultWithAsyncNull: {
                            boolean: false,
                            booleanWithDefault: true,
                            float: 0,
                            floatWithDefault: 10.5,
                            wrongFloat: 0,
                            wrongFloatWithDefault: 10.5,
                            int: 0,
                            wrongInt: 0,
                            intWithDefault: 10,
                            wrongIntWithDefault: 10,
                            json: null,
                            jsonWithDefault: {
                                json: 'json'
                            },
                            list: [],
                            listWithDefault: ['string'],
                            string: '',
                            stringWithDefault: 'stringValue'
                        },
                        objWithDefaultWithValue: {
                            boolean: true,
                            booleanWithDefault: true,
                            float: 10,
                            floatWithDefault: 10.5,
                            wrongFloat: 10.5,
                            wrongFloatWithDefault: 10.5,
                            int: 10,
                            wrongInt: 10,
                            intWithDefault: 10,
                            wrongIntWithDefault: 10,
                            json: {
                                json: 'jsonValue'
                            },
                            jsonWithDefault: {
                                json: 'json'
                            },
                            list: ['a', 'b'],
                            listWithDefault: ['string'],
                            string: 'stringValue',
                            stringWithDefault: 'stringValue'
                        },
                        objWithDefaultWithAsyncValue: {
                            boolean: true,
                            booleanWithDefault: true,
                            float: 10,
                            floatWithDefault: 10.5,
                            wrongFloat: 10.5,
                            wrongFloatWithDefault: 10.5,
                            int: 10,
                            intWithDefault: 10,
                            wrongInt: 10,
                            wrongIntWithDefault: 10,
                            json: {
                                json: 'jsonValue'
                            },
                            jsonWithDefault: {
                                json: 'json'
                            },
                            list: ['a', 'b'],
                            listWithDefault: ['string'],
                            string: 'stringValue',
                            stringWithDefault: 'stringValue'
                        },
                        objListWithAsyncNull: [],
                        objListWithValue: [{
                            boolean: true,
                            booleanWithDefault: null,
                            float: 10,
                            floatWithDefault: null,
                            int: 10,
                            intWithDefault: null,
                            json: {
                                json: 'jsonValue'
                            },
                            jsonWithDefault: null,
                            list: ['a', 'b'],
                            listWithDefault: null,
                            string: 'stringValue',
                            stringWithDefault: null
                        }],
                        objListWithAsyncValue: [{
                            boolean: true,
                            booleanWithDefault: null,
                            float: 10,
                            floatWithDefault: null,
                            int: 10,
                            intWithDefault: null,
                            json: {
                                json: 'jsonValue'
                            },
                            jsonWithDefault: null,
                            list: ['a', 'b'],
                            listWithDefault: null,
                            string: 'stringValue',
                            stringWithDefault: null
                        }],
                        objListWithDefault: [],
                        objListWithDefaultWithNull: [],
                        objListWithDefaultWithAsyncNull: [],
                        objListWithDefaultWithValue: [{
                            boolean: true,
                            booleanWithDefault: true,
                            float: 10,
                            floatWithDefault: 10.5,
                            int: 10,
                            intWithDefault: 10,
                            json: {
                                json: 'jsonValue'
                            },
                            jsonWithDefault: {
                                json: 'json'
                            },
                            list: ['a', 'b'],
                            listWithDefault: ['string'],
                            string: 'stringValue',
                            stringWithDefault: 'stringValue'
                        }],
                        objListWithDefaultWithAsyncValue: [{
                            boolean: true,
                            booleanWithDefault: true,
                            float: 10,
                            floatWithDefault: 10.5,
                            int: 10,
                            intWithDefault: 10,
                            json: {
                                json: 'jsonValue'
                            },
                            jsonWithDefault: {
                                json: 'json'
                            },
                            list: ['a', 'b'],
                            listWithDefault: ['string'],
                            string: 'stringValue',
                            stringWithDefault: 'stringValue'
                        }],
                        string: '',
                        stringWithNull: '',
                        stringWithAsyncNull: '',
                        stringWithValue: 'stringValue',
                        stringWithAsyncValue: 'stringValue',
                        stringWithDefault: 'stringValue'
                    }
                });

                done();
            })
            .catch(done);
    });
});