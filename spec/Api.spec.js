/* eslint-env jasmine */
'use strict';

var Api = require('../src/service/Api');
describe('Api', function() {
    var apiKey,
        config,
        sessionId = apiKey = '12345678';

    beforeEach(function() {
        config = {
            host: 'https://foo',
            version: '5.0'
        };
    });

    it('should set option headers to sessionId when passed', function() {
        config.sessionId = sessionId;
        var api = new Api(config);
        expect(api.options.headers.sessionID).toBe(sessionId);
    });

    it('should set option headers to apiKey when passed', function() {
        config.apiKey = apiKey;
        var api = new Api(config);
        expect(api.options.headers.apiKey).toBe(apiKey);
    });

    it('should has Methods property', function() {
        config.apiKey = apiKey;
        var api = new Api(config);
        expect(api.Methods).toBeDefined();
    });

    it('should has Constants property', function() {
        config.apiKey = apiKey;
        var api = new Api(config);
        expect(api.Constants).toBeDefined();
    });
});
