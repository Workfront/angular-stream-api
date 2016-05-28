'use strict';

module.exports = function(Api) {
    Api.prototype.remove = function(objCode, objID, force) {
        var path = objCode + '/' +objID;
        var params = force ? {force: true} : undefined;
        this.request(path, undefined, params, undefined, this.Methods.DELETE)
        .then(function(result) {
            if (result && result.success) {
                this.promise.resolve();
            } else {
                this.promise.reject();
            }
        }.bind(this));
    };
};
