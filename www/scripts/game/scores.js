define(['knockout', 'events', 'stopwatch'], function(ko, events, StopWatch) {

    function GameScore(label) {
        this.label = label;

        this.lastTimeValue = ko.observable();
        this.lastTime = ko.observable();

        this.bestTimeValue = ko.observable(Number.POSITIVE_INFINITY);
        this.bestTime = ko.observable();
    }

    GameScore.prototype.updateScore = function(stopWatch) {
        this.lastTimeValue(stopWatch.duration());
        this.lastTime(stopWatch.formatDuration());
        if (this.lastTimeValue() < this.bestTimeValue()) {
            this.bestTimeValue(this.lastTimeValue());
            this.bestTime(this.lastTime());
        }
    };

    function ScoreBoard() {
        this.stopWatch = new StopWatch();

        this.byDifficulty = {
            easy: new GameScore('easy'),
            hard: new GameScore('hard')
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

    ScoreBoard.prototype.initTimesGameScores = function() {
        var i;

        for (i = 1; i <= 9; i++) {
            this.byDifficulty['multiply' + i + 'x'] = new GameScore(i + 'x multiplication');
        }
    };

    return new ScoreBoard();
});