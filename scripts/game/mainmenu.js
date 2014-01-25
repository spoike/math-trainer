define(['knockout', 'lodash', 'terms', 'events', 'scores'], function(ko, _, Terms, events, scores) {
    
    function MainMenu() {
        this.scores = scores;
        this.terms = Terms.getInstance();

        events.on('endGame', _.bind(this.endGame, this));
    }

    MainMenu.prototype.newEasyGame = function() {
        this.terms.reset(Terms.easy);
        events.trigger('startGame', ['easy']);
    };

    MainMenu.prototype.newHardGame = function() {
        this.terms.reset(Terms.hard);
        events.trigger('startGame', ['hard']);
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