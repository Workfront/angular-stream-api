'use strict';

module.exports = function(Api) {
    Api.prototype.get = function(objCode, IDs, fields) {
        var params;
        if(typeof IDs === 'string') {
            IDs = [IDs];
        }

        if(IDs.length !== 0) {
            params = {
                ID: IDs
            };
        }

        return this.request(objCode, null, params, fields, this.Methods.GET);
    };
};
