define(['knockout', 'events', 'stopwatch'], function(ko, events, StopWatch) {

    function TimeEntry(label) {
        this.label = label;

        this.lastTimeValue = ko.observable();
        this.lastTime = ko.observable();

        this.bestTimeValue = ko.observable(Number.POSITIVE_INFINITY);
        this.bestTime = ko.observable();
    }

    TimeEntry.prototype.updateScore = function(stopWatch) {
        this.lastTimeValue(stopWatch.duration());
        this.lastTime(stopWatch.formatDuration());
        if (this.lastTimeValue() < this.bestTimeValue()) {
            this.bestTimeValue(this.lastTimeValue());
            this.bestTime(this.lastTime());
        }
    };

    function TimesBoard() {
        this.stopWatch = new StopWatch();

        this.byDifficulty = {
            easy: new TimeEntry('easy'),
            hard: new TimeEntry('hard')
        };
        this.initTimesGameScores();

        events.on('startGame', _.bind(function(difficultyLabel) {
            this.currentDifficulty = this.byDifficulty[difficultyLabel];
            this.stopWatch.start();
        }, this));

        events.on('endGame', _.bind(function() {
            this.stopWatch.stop();
            this.currentDifficulty.updateScore(this.stopWatch);
        }, this));
    }

    TimesBoard.prototype.initTimesGameScores = function() {
        var i;

        for (i = 1; i <= 9; i++) {
            this.byDifficulty['multiply' + i + 'x'] = new TimeEntry(i + 'x multiplication');
        }
    };

    return new TimesBoard();
});