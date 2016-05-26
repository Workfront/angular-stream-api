'use strict';

module.exports = function(Api) {
    Api.prototype.count = function(objCode, query) {
        var path = objCode + '/count';
        return this.request(path, null, query, null, this.Methods.GET)
        .then(function(response) {
            return response.data.count;
        });
    };
};
