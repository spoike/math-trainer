define(['knockout', 'lodash', 'terms', 'events'], function(ko, _, terms, events) {
    
    function MainMenu() {
        this.terms = terms;

        this.isPlaying = ko.observable(false);

        events.on('endGame', _.bind(this.endGame, this));
    }

    MainMenu.prototype.newGame = function() {
        this.terms.reset();
        this.isPlaying(true);
        this.initFocus();
    };

    MainMenu.prototype.endGame = function() {
        this.isPlaying(false);
    };

    MainMenu.prototype.initFocus = function() {
        _.defer(function() {
            $('input').eq(0).focus();
        });
    };

    return new MainMenu();

});