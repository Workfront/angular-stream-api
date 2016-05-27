'use strict';

module.exports = function(Api) {
    Api.prototype.create = function(objCode, data, fields) {
        return this.request(objCode, data, null, fields, this.Methods.POST);
    };
};
