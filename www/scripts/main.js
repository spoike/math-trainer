requirejs.config({
    baseUrl: 'scripts/game',
    paths: {
        'zepto': '../lib/zepto.min',
        'bootstrap': '../lib/bootstrap.min',
        'knockout': '../lib/knockout-3.0.0',
        'lodash': '../lib/lodash.min',
        'knockout-postbox': '../lib/knockout-postbox.min',
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

define(['utils', 'game', 'knockout', 'knockout-postbox'], function() {
    require(['othergames'], function() {
    });
});