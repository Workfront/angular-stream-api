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
