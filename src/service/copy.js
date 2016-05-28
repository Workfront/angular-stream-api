'use strict';

module.exports = function(Api) {
    Api.prototype.copy = function (objCode, objID, updates, fields) {
        if(!objCode || !objID) {
            throw new Error('You must provide at least objCode and objID');
        }
        var params = {
            copySourceID: objID
        };

        return this.request(objCode, updates, params, fields, this.Methods.POST);
    };
};
