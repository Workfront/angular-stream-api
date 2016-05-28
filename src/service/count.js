'use strict';

module.exports = function(Api) {
    Api.prototype.count = function(objCode, query) {
        if(!objCode) {
            throw new Error('You must provide \'objCode\'');
        }
        var path = objCode + '/count';
        return this.request(path, undefined, query, undefined, this.Methods.GET)
        .then(function(response) {
            if(response.data && response.data.count) {
                return response.data.count;
            }

            return this.promise.reject({message: 'Error'});
        }.bind(this));
    };
};
