'use strict';

module.exports = function(Api) {
    Api.prototype.remove = function(objCode, objID, force) {
        var path = objCode + '/' +objID;
        var params = force ? {force: true} : undefined;
        return this.request(path, undefined, params, undefined, this.Methods.DELETE)
        .then(function(response) {
            if (response.data && response.data.success) {
                return this.promise.resolve();
            } else {
                return this.promise.reject();
            }
        }.bind(this));
    };
};
