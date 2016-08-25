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

module.exports = function(Api) {
    Api.prototype.count = function(objCode, query) {
        if(!objCode) {
            throw new Error('You must provide \'objCode\'');
        }
        var path = objCode + '/count';
        return this.request(path, undefined, query, undefined, this.Methods.GET)
        .then(function(response) {
            if(response.data && typeof response.data.count === 'number') {
                return response.data.count;
            }

            return this.promise.reject({message: 'Server returned invalid data.'});
        }.bind(this));
    };
};
