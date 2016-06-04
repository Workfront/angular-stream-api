'use strict';

module.exports = function(Api) {
    Api.prototype.getApiKey = function(username, password) {
        var actionArgs = {
            username: username,
            password: password
        };
        
        return this.execute('user', undefined, 'getApiKey', actionArgs)
        .then(function(response) {
            var res = extractKey.call(this, response);
            if(res) {
                return res;
            }

            return this.execute('user', undefined, 'generateApiKey', actionArgs);
        }.bind(this))
        .then(function(response) {
            var res = extractKey.call(this, response);
            if(res) {
                return res;
            }
            
            this.promise.reject();
        }.bind(this));
    };
    
    function extractKey(response) {
        var data = response.data;
        if(data && data.data && data.data.result) {
            this.options.headers = { apiKey: data.data.result};
            return response;
        }
    }
};
