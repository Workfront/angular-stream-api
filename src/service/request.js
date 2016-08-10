'use strict';

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
        this.httpConfig = JSON.parse(JSON.stringify(this.options));

        var fullPath = path.indexOf('/') === 0 ? path : '/' + path;
        this.httpConfig.url = this.httpConfig.url + fullPath;

        params = params || {};
        if(fields.length !== 0) {
            params.fields = fields.join();
        }
        this.httpConfig.params = params;
        this.httpConfig.method = method;

        this.httpConfig.headers = this.httpConfig.headers || {};

        if( method === this.Methods.GET
        && (( this.httpConfig.url + '?' + JSON.stringify(params)).length > 1500
        || path === 'batch' )) {
            this.httpConfig.method = this.Methods.POST;
            params.method = this.Methods.GET;
            this.httpConfig.data = this.serializer(params);
            this.httpConfig.params = undefined;
            this.httpConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        } else if(data) {
            this.httpConfig.data = data;
            this.httpConfig.headers['Content-Type'] = 'application/json;charset=utf-8';
        }

        return this.http(this.httpConfig);
    };
};
