const _ = require('lodash');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
    GraphQLSchema,
    graphql
} = require('graphql');

const expect = chai.expect;
const withDefaultFields = require('./');
const Query = require('./testing');

chai.use(sinonChai);

describe('index.js', () => {
    it('should throw', () => {
        expect(() => withDefaultFields({})).to.throw('type should be instance of "GraphQLObjectType".');
    });

    it('should match', done => {
        const schema = new GraphQLSchema({
            query: withDefaultFields(Query)
        });

        const result = graphql({
                schema,
                source: `{
                    enum 

                    boolean
                    booleanWithNull
                    booleanWithAsyncNull
                    booleanWithValue
                    booleanWithAsyncValue

                    float
                    floatWithNull
                    floatWithAsyncNull
                    floatWithValue
                    floatWithAsyncValue

                    int
                    intWithNull
                    intWithAsyncNull
                    intWithValue
                    intWithAsyncValue

                    list
                    listWithNull
                    listWithAsyncNull
                    listWithValue
                    listWithAsyncValue

                    obj {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objWithNull {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objWithAsyncNull {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objWithValue {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objWithAsyncValue {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    
                    objWithDefault {
                        boolean
                        float
                        wrongFloat
                        int
                        wrongInt
                        list
                        string
                    }
                    objWithDefaultWithNull {
                        boolean
                        float
                        wrongFloat
                        int
                        wrongInt
                        list
                        string
                    }
                    objWithDefaultWithAsyncNull {
                        boolean
                        float
                        wrongFloat
                        int
                        wrongInt
                        list
                        string
                    }
                    objWithDefaultWithValue {
                        boolean
                        float
                        wrongFloat
                        int
                        wrongInt
                        list
                        string
                    }
                    objWithDefaultWithAsyncValue {
                        boolean
                        float
                        wrongFloat
                        int
                        wrongInt
                        list
                        string
                    }

                    obj {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objWithNull {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objListWithAsyncNull {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objListWithValue {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objListWithAsyncValue {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    
                    objListWithDefault {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objListWithDefaultWithNull {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objListWithDefaultWithAsyncNull {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objListWithDefaultWithValue {
                        boolean
                        float
                        int
                        list
                        string
                    }
                    objListWithDefaultWithAsyncValue {
                        boolean
                        float
                        int
                        list
                        string
                    }

                    string
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
                        float: 0,
                        floatWithNull: 0,
                        floatWithAsyncNull: 0,
                        floatWithValue: 10.5,
                        floatWithAsyncValue: 10.5,
                        int: 0,
                        intWithNull: 0,
                        intWithAsyncNull: 0,
                        intWithValue: 10,
                        intWithAsyncValue: 10,
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
                        obj: {
                            boolean: null,
                            float: null,
                            int: null,
                            list: null,
                            string: null
                        },
                        objWithNull: {
                            boolean: null,
                            float: null,
                            int: null,
                            list: null,
                            string: null
                        },
                        objWithAsyncNull: {
                            boolean: null,
                            float: null,
                            int: null,
                            list: null,
                            string: null
                        },
                        objWithValue: {
                            boolean: true,
                            float: 10,
                            int: 10,
                            list: [
                                'a',
                                'b'
                            ],
                            string: 'stringValue'
                        },
                        objWithAsyncValue: {
                            boolean: true,
                            float: 10,
                            int: 10,
                            list: [
                                'a',
                                'b'
                            ],
                            string: 'stringValue'
                        },
                        objWithDefault: {
                            boolean: false,
                            float: 0,
                            wrongFloat: 10.5,
                            int: 0,
                            wrongInt: 10,
                            list: [],
                            string: ''
                        },
                        objWithDefaultWithNull: {
                            boolean: false,
                            float: 0,
                            wrongFloat: 10.5,
                            int: 0,
                            wrongInt: 10,
                            list: [],
                            string: ''
                        },
                        objWithDefaultWithAsyncNull: {
                            boolean: false,
                            float: 0,
                            wrongFloat: 10.5,
                            int: 0,
                            wrongInt: 10,
                            list: [],
                            string: ''
                        },
                        objWithDefaultWithValue: {
                            boolean: true,
                            float: 10,
                            wrongFloat: 10.5,
                            int: 10,
                            wrongInt: 10,
                            list: [
                                'a',
                                'b'
                            ],
                            string: 'stringValue'
                        },
                        objWithDefaultWithAsyncValue: {
                            boolean: true,
                            float: 10,
                            wrongFloat: 10.5,
                            int: 10,
                            wrongInt: 10,
                            list: [
                                'a',
                                'b'
                            ],
                            string: 'stringValue'
                        },
                        objListWithAsyncNull: [],
                        objListWithValue: [{
                            boolean: true,
                            float: 10,
                            int: 10,
                            list: [
                                'a',
                                'b'
                            ],
                            string: 'stringValue'
                        }],
                        objListWithAsyncValue: [{
                            boolean: true,
                            float: 10,
                            int: 10,
                            list: [
                                'a',
                                'b'
                            ],
                            string: 'stringValue'
                        }],
                        objListWithDefault: [],
                        objListWithDefaultWithNull: [],
                        objListWithDefaultWithAsyncNull: [],
                        objListWithDefaultWithValue: [{
                            boolean: true,
                            float: 10,
                            int: 10,
                            list: [
                                'a',
                                'b'
                            ],
                            string: 'stringValue'
                        }],
                        objListWithDefaultWithAsyncValue: [{
                            boolean: true,
                            float: 10,
                            int: 10,
                            list: [
                                'a',
                                'b'
                            ],
                            string: 'stringValue'
                        }],
                        string: '',
                        stringWithNull: '',
                        stringWithAsyncNull: '',
                        stringWithValue: 'stringValue',
                        stringWithAsyncValue: 'stringValue'
                    }
                });

                done();
            });
    });
});