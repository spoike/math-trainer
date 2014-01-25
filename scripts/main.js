requirejs.config({
    baseUrl: 'scripts/game',
    paths: {
        'zepto': '../lib/zepto.min',
        'bootstrap': '../lib/bootstrap.min',
        'knockout': '../lib/knockout-3.0.0',
        'lodash': '../lib/lodash.min',
        'EventEmitter': '../lib/EventEmitter.min'
    },
    shim: {
        'zepto': {
            exports: 'Zepto'
        },
        'knockout': {
            exports: 'ko'
        }
    }
});

define(['utils', 'game', 'knockout'], function() {
    require(['othergames'], function() {
    });
});