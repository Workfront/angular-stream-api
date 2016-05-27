'use strict';

var angular = require('angular');

module.exports = function(Api) {
    Api.prototype.request = function(path, data, params, fields, method) {
        this.config = {};
        this.config = angular.extend({}, this.options);

        var fullPath = path.indexOf('/') === 0 ? path : '/' + path;
        this.config.url = this.config.url + fullPath;

        fields = fields || [];
        if(typeof fields === 'string') {
            fields = [fields];
        }

        this.config.method = method;
        if(method === this.Methods.POST || method === this.Methods.PUT) {
            if(!data && path !== 'login') {
                throw new Error('You must specify \'data\' in case you have used PUT or POST');
            }

            this.config.data = data;
            this.config.headers = this.config.headers || {};
            this.config.headers['Content-Type'] = 'application/json;charset=utf-8';
        } else if(data && path !== 'login') {
            throw new Error('You must specify method PUT or POST in case have passed \'data\'');
        }

        params = params || {};
        if(fields.length !== 0) {
            params.fields = fields.join();
        }

        this.config.params = params;
        
        return this.http(this.config);
    };
};
