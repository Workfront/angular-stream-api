'use strict';

module.exports = function(Api) {
    Api.prototype.metadata = function (objCode) {
        var path = '/metadata';
        if (objCode) {
            path = objCode + path;
        }
        return this.request(path, undefined, undefined, undefined, this.Methods.GET);
    };
};
