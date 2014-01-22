define(['knockout', 'events', 'stopwatch'], function(ko, events, StopWatch) {

    function ScoreBoard() {

        this.stopWatch = new StopWatch();

        this.lastTimeValue = ko.observable();
        this.lastTime = ko.observable();

        this.bestTimeValue = ko.observable(Number.POSITIVE_INFINITY);
        this.bestTime = ko.observable();

        events.on('startGame', _.bind(function() {
            this.stopWatch.start();
        }, this));

        events.on('endGame', _.bind(function() {
            this.stopWatch.stop();
            this.lastTimeValue(this.stopWatch.duration());
            this.lastTime(this.stopWatch.formatDuration());
            if (this.lastTimeValue() < this.bestTimeValue()) {
                this.bestTimeValue(this.lastTimeValue());
                this.bestTime(this.lastTime());
            }
        }, this));

    };

    return new ScoreBoard();
});