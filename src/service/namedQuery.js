'use strict';

module.exports = function(Api) {
    Api.prototype.namedQuery = function(objCode, queryName, queryArgs, fields) {
        var path = objCode + '/' + queryName;
        return this.request(path, undefined, queryArgs, fields, this.Methods.GET);
    };
};
