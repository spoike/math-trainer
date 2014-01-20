define(['lodash', 'knockout', 'mainmenu', 'events', 'timesmenu', 'stopwatch'], function(_, ko, mainmenu, events, timesMenu, StopWatch) {

    function Game() {
        this.stopWatch = new StopWatch();

        this.lastTimeValue = ko.observable();
        this.lastTime = ko.observable();

        this.bestTimeValue = ko.observable(Number.POSITIVE_INFINITY);
        this.bestTime = ko.observable();

        this.screens = [
            {
                templateName: 'main-menu-template',
                data: mainmenu,
                isActive: ko.observable(true),
                init: _.noop
            },
            {
                templateName: 'game-template',
                data: mainmenu.terms,
                isActive: ko.observable(false),
                init: mainmenu.initFocus
            },
            {
                templateName: 'times-options-template',
                data: timesMenu,
                isActive: ko.observable(false),
                init: _.noop
            }
        ];

        events.on('startGame', _.bind(function() {
            this.changeToScreen(1);
            this.stopWatch.start();
        }, this));

        events.on('endGame', _.bind(function() {
            this.changeToScreen(0);
            this.stopWatch.stop();
            this.lastTimeValue(this.stopWatch.duration());
            this.lastTime(this.stopWatch.formatDuration());
            if (this.lastTimeValue() < this.bestTimeValue()) {
                this.bestTimeValue(this.lastTimeValue());
                this.bestTime(this.lastTime());
            }
        }, this));

        events.on('goToMain', _.bind(this.changeToScreen, this, 0));

        events.on('goToTimes', _.bind(this.changeToScreen, this, 2));
    }

    Game.prototype.changeToScreen = function(idx) {
       var i;
       if (idx >= this.screens.length) {
           return;
       }
       for (i = 0; i < this.screens.length; i++) {
           this.screens[i].isActive(idx === i);
       } 
    };

    ko.applyBindings(new Game());

});