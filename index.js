const _ = require('lodash');
const {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

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

module.exports = type => {
    if (!(type instanceof GraphQLObjectType)) {
        throw new Error('type should be instance of "GraphQLObjectType".');
    }

    const fields = _.reduce(type._typeConfig.fields, (reduction, field, key) => {
        const typeString = field.type instanceof GraphQLObjectType ? 'Object' : field.type.toString();
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

        reduction[key] = _.extend({}, field, {
            resolve
        });

        return reduction;
    }, {});

    return new GraphQLObjectType({
        astNode: type.astNode,
        description: type.description,
        extensionASTNodes: type.extensionASTNodes,
        fields,
        isTypeOf: type.isTypeOf,
        name: type.name + 'WithDefault'
    });
};