const _ = require('lodash');
const {
    GraphQLObjectType
} = require('graphql');

const defaultCache = new Map();
const defaults = {
    'Boolean': false,
    'Float': 0,
    'Int': 0,
    'String': '',
    'Object': {}
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

const extendField = (field, key, deep, realm, cache) => {
    const isObjectType = field.type instanceof realm;
    const type = isObjectType ? 'Object' : field.type.toString();
    const defaultValue = matchDefault(type);

    const responseOrDefault = response => {
        if (_.isNil(response)) {
            return defaultValue;
        }

        if (type === 'Int') {
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
        type: deep && isObjectType ? withDefaultFields(field.type, deep, realm, cache) : field.type
    });
};

const withDefaultFields = (type, deep = false, realm = null, cache = defaultCache) => {
    if(!realm) {
        realm = GraphQLObjectType;
    }

    if (!(type instanceof realm)) {
        throw new Error('type should be instance of "GraphQLObjectType".');
    }

    const name = type.name + 'WithDefaults';
    const cached = cache && cache.get(name);

    if (cached) {
        return cached;
    }

    const fields = type._typeConfig.fields;
    const newType = new realm({
        astNode: type.astNode,
        description: type.description,
        extensionASTNodes: type.extensionASTNodes,
        fields: _.reduce(_.isFunction(fields) ? fields() : fields, (reduction, field, key) => {
            if (field.__haveDefaults || field.__preventDefaults) {
                reduction[key] = field;
            } else {
                reduction[key] = extendField(field, key, deep, realm);
            }
    
            return reduction;
        }, {}),
        isTypeOf: type.isTypeOf,
        name: name
    });

    cache && cache.set(name, newType);

    return newType;
};

module.exports = withDefaultFields;