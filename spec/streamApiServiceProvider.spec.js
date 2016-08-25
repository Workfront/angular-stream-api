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

/*eslint-env jasmine */

'use strict';

var angular = require('angular');
var Api = require('./../src/service/Api');

describe('streamApiServiceProvider', function() {

    beforeEach(function() {
        var ngModule = angular.module('mockModule', []);

        require('./../src/streamApiServiceProvider')(ngModule);
    });

    beforeEach(angular.mock.module('mockModule'));

    var streamApiService;

    beforeEach(function() {
        angular.mock.inject(function(_streamApiService_) {
            streamApiService = _streamApiService_;
        });
    });

    it('should have function getInstance', function() {
        expect(typeof streamApiService.getInstance).toBe('function');
    });

    it('should have function deleteInstance', function() {
        expect(typeof streamApiService.deleteInstance).toBe('function');
    });

    it('should set Api http property', function() {
        var api = streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        expect(typeof api.http).toBe('function');
    });

    it('should set Api http property', function() {
        var api = streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        expect(typeof api.serializer).toBe('function');
    });

    it('should set Api http property', function() {
        var api = streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        expect(typeof api.promise).toBe('function');
    });

    it('should return an object of type Api', function() {
        var api = streamApiService.getInstance({host:'https://foo'});
        expect(api).toEqual(jasmine.any(Api));
    });

    it('should throw exception when passed not an object', function() {
        expect(function(){streamApiService.getInstance('foo');})
            .toThrow(new Error('Please provide valid configuration object.'));
    });

    it('should throw exception when not passed config on first call of getInstance', function() {
        expect(function(){streamApiService.getInstance();})
            .toThrow(new Error('Please provide valid configuration object.'));
    });

    it('should throw exception when passed argument hasn\'t host property', function() {
        expect(function(){streamApiService.getInstance({nohost: 'foo'});})
            .toThrow(new Error('\'config\' should have \'host\' property of type \'string\''));
    });

    it('should throw exception when host type is not string', function() {
        expect(function(){streamApiService.getInstance({host: 1});})
            .toThrow(new Error('\'config\' should have \'host\' property of type \'string\''));
    });

    it('should throw exception when passing config.host without valid scheme', function() {
        expect(function(){streamApiService.getInstance({host: 'foo'});})
            .toThrow(new Error('You must provide valid scheme with \'host\''));
    });

    it('should set it\'s options.url correctly with version=internal when passed correct host and not passed version', function() {
        var api = streamApiService.getInstance({host: 'https://foo'});
        expect(api.options.url).toBe('https://foo/attask/api-internal');
    });

    it('should set it\'s options.url when passed valid host and version unsupported', function() {
        var api = streamApiService.getInstance({host: 'https://foo', version: 'unsupported'});
        expect(api.options.url)
            .toBe('https://foo/attask/api-unsupported');
    });

    it('should set it\'s options.url when passed valid host and version internal', function() {
        var api = streamApiService.getInstance({host: 'https://foo', version: 'internal'});
        expect(api.options.url)
            .toBe('https://foo/attask/api-internal');
    });

    it('should set it\'s options.url when passed valid host and version number', function() {
        var api = streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        expect(api.options.url)
            .toBe('https://foo/attask/api/v5.0');
    });

    it('should return the same object on subsequent call of getInstance when not passed config', function() {
        var api1 = streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        var api2 = streamApiService.getInstance();
        expect(api1).toEqual(api2);
    });

    it('should return equal but not the same streamApi instance when subsequent call with same config made after deleteInstance', function() {
        var api1 = streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        streamApiService.deleteInstance();
        var api2 = streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        expect(api1).not.toBe(api2); // not the same
        expect(api1).toEqual(api2); // equal
    });

    it('should throw when subsequent call of getInstance without config made after deleteInstance', function() {
        streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        streamApiService.deleteInstance();
        expect(function() {
            streamApiService.getInstance();
        }).toThrow();
    });

    it('should return the same instance when subseqent calls reseive the config which represents the same origin and version', function() {
        var api1 = streamApiService.getInstance({host: 'https://foo/a', version: '5.0'});
        var api2 = streamApiService.getInstance({host: 'https://foo/b', version: '5.0'});
        expect(api1).toBe(api2);
    });

    it('should return new instance when passed requestNewInstance without touching default instance', function() {
        var api1= streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        var api2= streamApiService.getInstance({host: 'https://bar', version: '4.0'}, true);
        var api3= streamApiService.getInstance();
        expect(api1).not.toEqual(api2);
        expect(api1).toEqual(api3);
    });

    it('should return new instance when passed requestNewInstance without touching default instance', function() {
        var api1= streamApiService.getInstance({host: 'https://foo', version: '5.0'});
        var api2= streamApiService.getInstance({host: 'https://bar', version: '4.0'}, true);
        var api3= streamApiService.getInstance();
        expect(api1).not.toEqual(api2);
        expect(api1).toEqual(api3);
    });
});
