const _ = require('lodash');
const {
    GraphQLObjectType
} = require('graphql');

const defaults = {
    'Boolean': false,
    'Float': 0,
    'Int': 0,
    'Json': null,
    'String': '',
    'Object': {
        __default__: true
    }
};

const matchDefault = type => {
    if (_.first(type) === '[' && _.last(type) === ']') {
        return [];
    }

    const defaultType = defaults[type];

    if (_.isNil(defaultType)) {
        return null;
    }

    return defaultType;
};

let extendField = (field, key, realm, objectDefault) => {
    const isObjectType = field.type instanceof realm;
    const type = isObjectType ? 'Object' : field.type.toString();
    const fieldDefault = field.fieldDefault ||
        objectDefault ||
        matchDefault(type);

    const responseOrDefault = response => {
        if (_.isNil(response)) {
            return fieldDefault;
        }

        if (type === 'Int') {
            return _.parseInt(response);
        }

        return response;
    };

    const resolve = field.resolve ? (obj, args, context, info) => {
        if (obj && obj.__default__) {
            return responseOrDefault();
        }

        const resolved = field.resolve(obj, args, context, info);

        if (resolved && resolved.then) {
            return resolved.then(responseOrDefault);
        }

        return responseOrDefault(resolved);
    } : obj => {
        return responseOrDefault(obj && obj[key]);
    };

    return {
        ...field,
        resolve,
        __withDefaults: true
    };
};

module.exports = (realm = GraphQLObjectType) => {
    return {
        GraphQLObjectType: class extends realm {
            constructor(args) {
                const fields = _.isFunction(args.fields) ? args.fields() : args.fields;
                const objectDefault = args.objectDefault;

                args.fields = _.reduce(fields, (reduction, field, key) => {
                    if (field.__preventDefaults) {
                        reduction[key] = field;
                    } else {
                        reduction[key] = extendField(field, key, realm, objectDefault && objectDefault[key]);
                    }

                    return reduction;
                }, {});

                super(args);
            }
        }
    };
};