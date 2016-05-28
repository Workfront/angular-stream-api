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

        this.config = {};
        this.config = angular.extend({}, this.options);

        var fullPath = path.indexOf('/') === 0 ? path : '/' + path;
        this.config.url = this.config.url + fullPath;

        params = params || {};
        if(fields.length !== 0) {
            params.fields = fields.join();
        }
        this.config.params = params;
        this.config.method = method;

        if( method === this.Methods.GET
        && (( this.config.url + '?'+ this.serializer(params)).length > 2000
            || path === 'batch' )) {
            this.config.method = this.Methods.POST;
            params.method = this.Methods.GET;
            this.config.data = params;
            this.config.params = undefined;
            this.config.headers = this.config.headers || {};
            this.config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        } else if(data) {
            this.config.data = data;
            this.config.headers = this.config.headers || {};
            this.config.headers['Content-Type'] = 'application/json;charset=utf-8';
        }

        return this.http(this.config);
    };
};
