'use strict';

var angular = require('angular');

module.exports = function(Api) {
    Api.prototype.edit = function(objCode, objID, data, fields) {
        if(!data) {
            throw new Error('You should pass edit data as \'data\' argument');
        }
        if(angular.isObject(objID) && ('ID' in objID)) {
            angular.extend(data, objID);
        } else if(typeof objID === 'string') {
            data.ID = objID;
        } else {
            throw new Error('You should pass \'objID\' as a string or object with property \'ID\'');
        }
        return this.request(objCode, data, null, fields, this.Methods.PUT);
    };
};
