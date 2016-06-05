'use strict';

var angular = require('angular');

module.exports = function(Api) {
    Api.prototype.request = function(path, data, params, fields, method) {
        if(data && method !== this.Methods.POST && method !== this.Methods.PUT) {
            throw new Error('You must specify method PUT or POST in case you have passed \'data\'');
        }
        
        if(method === this.Methods.POST && !data && path !== 'login') {
            throw new Error('You must specify \'data\' in case you have used POST');
        }

        fields = fields || [];
        if(typeof fields === 'string') {
            fields = [fields];
        }

        this.httpConfig = {};
        this.httpConfig = angular.extend({}, this.options);

        var fullPath = path.indexOf('/') === 0 ? path : '/' + path;
        this.httpConfig.url = this.httpConfig.url + fullPath;

        params = params || {};
        if(fields.length !== 0) {
            params.fields = fields.join();
        }
        this.httpConfig.params = params;
        this.httpConfig.method = method;

        if( method === this.Methods.GET
        && (( this.httpConfig.url + '?'+ this.serializer(params)).length > 2000
            || path === 'batch' )) {
            this.httpConfig.method = this.Methods.POST;
            params.method = this.Methods.GET;
            this.httpConfig.data = params;
            this.httpConfig.params = undefined;
            this.httpConfig.headers = this.httpConfig.headers || {};
            this.httpConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        } else if(data) {
            this.httpConfig.data = data;
            this.httpConfig.headers = this.httpConfig.headers || {};
            this.httpConfig.headers['Content-Type'] = 'application/json;charset=utf-8';
        }

        return this.http(this.httpConfig);
    };
};
