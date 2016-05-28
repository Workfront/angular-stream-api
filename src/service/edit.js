'use strict';

var angular = require('angular');

module.exports = function(Api) {
    Api.prototype.edit = function(objCode, objID, data, fields) {
        if(!objCode || typeof objCode !== 'string') {
            throw new Error('You must provide objCode of type string');
        }
        if(!data || !angular.isObject(data)) {
            throw new Error('You must provide edit data object as \'data\' argument');
        }
        if(!objID || typeof objID !== 'string') {
            if(!('ID' in data)) {
                throw new Error('You must provide either \'ojbID\' of type string or \'data\' with property ID');
            }
        } else {
            data.ID = objID;
        }
        return this.request(objCode, data, undefined, fields, this.Methods.PUT);
    };
};
