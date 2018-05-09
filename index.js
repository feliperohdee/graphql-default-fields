const _ = require('lodash');
const {
    GraphQLObjectType
} = require('graphql');

const cache = {};
const defaults = {
    'Boolean': false,
    'Float': 0,
    'Int': 0,
    'String': '',
    'Object': {}
};

const matchDefault = typeString => {
    if (_.first(typeString) === '[' && _.last(typeString) === ']') {
        return [];
    }

    const defaultType = defaults[typeString];

    if (_.isNil(defaultType)) {
        return null;
    }

    return defaultType;
};

const extendField = (field, key, deep = false, realm = GraphQLObjectType) => {
    const isObject = field.type instanceof realm;
    const typeString = isObject ? 'Object' : field.type.toString();
    const defaultValue = matchDefault(typeString);

    const responseOrDefault = response => {
        if (_.isNil(response)) {
            return defaultValue;
        }

        if (typeString === 'Int') {
            return _.parseInt(response);
        }

        return response;
    };

    const resolve = field.resolve ? (obj, args, context, info) => {
        const resolved = field.resolve(obj, args, context, info);

        if (resolved && resolved.then) {
            return resolved.then(responseOrDefault);
        }

        return responseOrDefault(resolved);
    } : obj => {
        return responseOrDefault(obj && obj[key]);
    };

    return _.extend({}, field, {
        __haveDefaults: true,
        resolve,
        type: deep && isObject ? doIt(field.type, deep, realm) : field.type
    });
};

const doIt = (type, deep = false, realm = GraphQLObjectType) => {
    if (!(type instanceof realm)) {
        throw new Error('type should be instance of "GraphQLObjectType".');
    }

    const fields = _.reduce(type._typeConfig.fields, (reduction, field, key) => {
        if (field.__haveDefaults || field.__preventDefaults) {
            reduction[key] = field;
        } else {
            reduction[key] = extendField(field, key, deep, realm);
        }

        return reduction;
    }, {});

    const newName = type.name + 'WithDefaults';
    const newType = cache[newName] || new realm({
        astNode: type.astNode,
        description: type.description,
        extensionASTNodes: type.extensionASTNodes,
        fields,
        isTypeOf: type.isTypeOf,
        name: newName
    });

    if(!cache[newName]) {
        cache[newName] = newType;
    }

    return newType;
};

module.exports = doIt;