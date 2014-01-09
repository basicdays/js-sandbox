(function() {
    'use strict';
    requirejs.config({
        baseUrl: 'scripts/lib',
        paths: {
            scratchpad: '../src',
            jquery: 'jquery-2.0.3'
        }
    });

    requirejs(['scratchpad/test'], function(test) {
        test();
    })
}());
