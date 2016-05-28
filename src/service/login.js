'use strict';

module.exports = function(Api) {
    Api.prototype.login = function(username, password) {
        var params = {
            username: username,
            password: password
        };

        return this.request('login', undefined, params, undefined, this.Methods.POST)
        .then(function(response) {
            if(response.data && response.data.data) {
                this.options.headers = {sessionID: response.data.data.sessionID};
                return response.data;
            }

            return this.promise.reject();
        }.bind(this));
    };
};
