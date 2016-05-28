'use strict';

module.exports = function(Api) {
    Api.prototype.search = function(objCode, params, fields) {
        var endPoint = objCode + '/search';
        return this.request(endPoint, undefined, params, fields, this.Methods.GET);
    };
};
