'use strict';

module.exports = function(Api) {
    Api.prototype.copy = function (objCode, objID, updates, fields) {
        var params = {
            copySourceID: objID
        };
        
        return this.request(objCode, updates, params, fields, this.Methods.POST);
    };
};
