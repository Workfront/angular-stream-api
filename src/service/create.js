'use strict';

module.exports = function(Api) {

    Api.prototype.create = function(objCode, data, fields) {
        if(!objCode || !data) {
            throw new Error('You must provide at least objCode and data');
        }
        return this.request(objCode, data, undefined, fields, this.Methods.POST);
    };
};
