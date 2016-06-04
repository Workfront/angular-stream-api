'use strict';

module.exports = function(Api) {
    Api.prototype.logout = function() {
        return this.request('logout', undefined, undefined, undefined, this.Methods.GET)
        .then(function(response) {
            if(response.data && response.data.data && response.data.data.success) {
                delete this.options.headers;
                return this.promise.resolve();
            }

            return this.promise.reject();
        }.bind(this));
    };
};
