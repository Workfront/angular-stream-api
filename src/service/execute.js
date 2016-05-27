'use strict';

module.exports = function(Api) {
    Api.prototype.execute = function (objCode, objID, action, actionArgs) {
        var endPoint = objCode;
        if (objID) {
            endPoint += '/' + objID + '/' + action;
        }
        else {
            actionArgs = actionArgs || {};
            actionArgs['action'] = action;
        }
        return this.request(endPoint, actionArgs, null, this.Methods.PUT);
    };
};
