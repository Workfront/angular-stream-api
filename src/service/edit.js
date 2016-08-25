/**
 * Copyright 2015 Workfront
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var angular = require('angular');

module.exports = function(Api) {
    Api.prototype.edit = function(objCode, objID, data, fields) {
        if(!objCode || typeof objCode !== 'string') {
            throw new Error('You must provide objCode of type string');
        }
        if(!data || !angular.isObject(data)) {
            throw new Error('You must provide edit data object as \'data\' argument');
        }
        if(!objID || typeof objID !== 'string') {
            if(!('ID' in data)) {
                throw new Error('You must provide either \'ojbID\' of type string or \'data\' with property ID');
            }
        } else {
            data.ID = objID;
        }
        return this.request(objCode, data, undefined, fields, this.Methods.PUT);
    };
};
