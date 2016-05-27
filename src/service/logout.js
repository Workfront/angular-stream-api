'use strict';

module.exports = function(Api) {
    Api.prototype.logout = function() {
        return this.request('logout', null, null, null, this.Methods.GET)
        .then(function(response) {
            if(response.data && response.data.success) {
                delete this.options.sessionID;
                return this.promise.resolve();
            }

            return this.promise.reject();
        }.bind(this));
    };
};
