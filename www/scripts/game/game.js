define(['lodash', 'knockout', 'mainmenu', 'events', 'timesmenu'], function(_, ko, mainmenu, events, timesMenu) {

    function Game() {
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
            this.screens[0].isActive(false);
            this.screens[1].isActive(true);
            this.screens[2].isActive(false);
        }, this));

        events.on('endGame', _.bind(function() {
            this.screens[0].isActive(true);
            this.screens[1].isActive(false);
            this.screens[2].isActive(false);
        }, this));

        events.on('goToMain', _.bind(function() {
            this.screens[0].isActive(true);
            this.screens[1].isActive(false);
            this.screens[2].isActive(false);
        }, this));

        events.on('goToTimes', _.bind(function() {
            this.screens[0].isActive(false);
            this.screens[1].isActive(false);
            this.screens[2].isActive(true);
        }, this));
    }

    ko.applyBindings(new Game());

});