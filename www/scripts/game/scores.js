define(['knockout', 'events', 'stopwatch', 'log'], function(ko, events, StopWatch, log) {

    function TimeEntry(label) {
        this.label = label;

        this.lastTimeValue = ko.observable();
        this.lastTime = ko.observable();

        this.bestTimeValue = ko.observable(Number.POSITIVE_INFINITY);
        this.bestTime = ko.observable();

        this.loadScore();
    }

    TimeEntry.prototype.updateScore = function(stopWatch) {
        this.lastTimeValue(stopWatch.duration());
        this.lastTime(stopWatch.formatDuration());
        if (this.lastTimeValue() < this.bestTimeValue()) {
            this.bestTimeValue(this.lastTimeValue());
            this.bestTime(this.lastTime());
        }
        this.saveScore();
    };

    TimeEntry.prototype.loadScore = function() {
        var times = localStorage.getItem('time_' + this.label), timesObj;
        if (!times) {
            return;
        }
        timesObj = JSON.parse(times);
        this.bestTimeValue(timesObj.bestTime.val);
        this.bestTime(timesObj.bestTime.formatted);
        this.lastTimeValue(timesObj.lastTime.val);
        this.lastTime(timesObj.lastTime.formatted);
    };

    TimeEntry.prototype.saveScore = function() {
        var timesObj = {
            bestTime: {
                val: this.bestTimeValue(),
                formatted: this.bestTime()
            },
            lastTime: {
                val: this.lastTimeValue(),
                formatted: this.lastTime()
            }
        }
        localStorage.setItem('time_' + this.label, JSON.stringify(timesObj));
    }

    function TimesBoard() {
        this.stopWatch = new StopWatch();

        this.byDifficulty = {
            easy: new TimeEntry('easy'),
            hard: new TimeEntry('hard')
        };
        this.initTimesGameScores();

        events.on('startGame', _.bind(function(difficultyLabel) {
            this.currentDifficultyLabel = difficultyLabel;
            this.currentDifficulty = this.byDifficulty[difficultyLabel];
            this.stopWatch.start();
            log.event('Start Game', difficultyLabel);
        }, this));

        events.on('endGame', _.bind(function() {
            this.stopWatch.stop();
            this.currentDifficulty.updateScore(this.stopWatch);
            log.event('Finish Game', this.currentDifficultyLabel);
            log.timing('Finish Game', this.stopWatch.duration(), this.currentDifficultyLabel);
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