define(['knockout', 'lodash', 'terms', 'events'], function(ko, _, terms, events) {
    
    function MainMenu() {
        this.terms = terms;

        events.on('endGame', _.bind(this.endGame, this));
    }

    MainMenu.prototype.newEasyGame = function() {
        this.terms.reset(terms.easy);
        events.trigger('newEasyGame');
        events.trigger('startGame');
    };

    MainMenu.prototype.newHardGame = function() {
        this.terms.reset(terms.hard);
        events.trigger('newHardGame');
        events.trigger('startGame');
    };

    MainMenu.prototype.endGame = function() {
    };

    MainMenu.prototype.initFocus = function() {
        _.defer(function() {
            $('input').eq(0).focus();
        });
    };

    MainMenu.prototype.goToTimes = function() {
        events.trigger('goToTimes');
    };

    return new MainMenu();

});