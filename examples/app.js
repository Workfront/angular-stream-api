/* global angular */
'use strict';

angular.module('testApp', ['streamApi'])
.controller('testController', ['streamApiService', function(streamApiService) {
    this.doLogin = function() {
        var self = this;
        self.loginData = {};
        try {
            var streamApi = streamApiService.getInstance({url: self.host, version:'5.0'});
        } catch(e) {
            self.loginData = e.message;
        }
        
        streamApi.login(self.username, self.password)
        .then(function(response) {
            self.loginData.loginData =  response.data;
            var params = {};
            params['name'] = 'task ^&%$#@!~`';
            // params['status' + streamApi.Constants.MOD] = streamApi.Constants.Operators.NOTEQUAL;
            params[streamApi.Constants.LIMIT] = 1;
            return streamApi.search('task', params, 'ID');
        })
        .then(function(response) {
            self.loginData.searchedTask =  response.data;
            var params = {};
            params['status'] = 'NEW';
            // params['status' + streamApi.Constants.MOD] = streamApi.Constants.Operators.NOTEQUAL;
            params[streamApi.Constants.LIMIT] = 1;
            return streamApi.search('project', params, 'ID');
        })
        .then(function(response) {
            self.loginData.projectData =  response.data;
            var data = {
                name: 'Task created by angular-stream-api',
                projectID: response.data.data[0].ID
            };
            return streamApi.create('task', data);
        })
        .then(function(response) {
            self.loginData.createdTask =  response.data;
            var actionArgs = {
                userIDs: [streamApi.Constants.WildCards.USER],
                roleIDs: []
            };
            return streamApi.execute('task', response.data.data.ID, 'assignMultiple', actionArgs);
        })
        .then(function(response) {
            self.loginData.assignedTask = response.data;
            return streamApi.execute('task', response.data.data.ID, 'markDone');
        })
        .then(function(response) {
            self.loginData.doneTask = response.data;
        })
        .catch(function(error) {
            self.loginData.error = error;
        });
    };
}]);
