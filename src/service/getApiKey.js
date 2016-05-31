'use strict';

module.exports = function(Api) {
    Api.prototype.getApiKey = function(username, password) {
        var actionArgs = {
            username: username,
            password: password
        };
        
        return this.execute('user', undefined, 'getApiKey', actionArgs)
        .then(function(response) {
            if(response.data && response.data.data) {
                this.options.headers = this.options.headers || {}; 
                this.options.headers = {apiKey: response.data.data.result};
                return response.data;
            }

            return this.promise.reject();
        }.bind(this));
    };
};
