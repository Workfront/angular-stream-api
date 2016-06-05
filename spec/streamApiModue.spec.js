/* eslint-env jasmine */

'use strict';

describe('streamApiModule', function() {
    it('should return valid module with name \'streamApiModule\'', function() {
        expect(require('../src/streamApiModule').name).toBe('streamApi');
    });
});
