define(['jquery'], function($) {
    'use strict';
    return function() {
        alert($('h1')[0].innerHTML);
    };
});
