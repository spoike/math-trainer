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

        events.on('startGame', _.bind(this.changeToScreen, this, 1));

        events.on('endGame', _.bind(this.changeToScreen, this, 0));

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