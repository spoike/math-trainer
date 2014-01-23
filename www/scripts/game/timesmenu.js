define(['knockout', 'lodash', 'terms', 'events'], function(ko, _, Terms, events) {

    function TimesMenu() {
        this.terms = Terms.getInstance();
        this.options = [];
        this.initOptions();
    }

    TimesMenu.prototype.initOptions = function() {
        var i;
        for (i = 1; i <= 9; i++) {
            this.options.push({
                label: i + '×',
                action: _.bind(this.setUpTerms, this, i)
            });
        }
    };

    TimesMenu.prototype.setUpTerms = function(times) {
        this.terms.resetTimes(times);

        events.trigger('startGame', ['multiply' + times + 'x']);
    };

    TimesMenu.prototype.goToMain = function() {
        events.trigger('goToMain');
    };

    return new TimesMenu();

});