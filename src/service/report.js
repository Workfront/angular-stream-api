'use strict';

module.exports = function(Api) {
    Api.prototype.report = function(objCode, query) {
        var path = objCode + '/report';
        return this.request(path, undefined, query, undefined, this.Methods.GET);
    };
};
