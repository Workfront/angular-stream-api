'use strict';

module.exports = function(Api) {
    Api.prototype.login = function(username, password) {
        var params = {
            username: username,
            password: password
        };

        this.request('login', null, params, null, this.Methods.POST)
        .then(function(response) {
            if(response.data && response.data.data) {
                this.options.sessionID = response.data.data.sessionID;
                return response.data.data;
            }

            return this.promise.reject();
        }.bind(this));
    };
};
