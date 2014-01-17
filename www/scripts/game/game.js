define(['zepto', 'knockout', 'mainmenu'], function($, ko, mainmenu) {

    function Game() {
        this.mainmenu = mainmenu;
    }

    ko.applyBindings(new Game().mainmenu);

});