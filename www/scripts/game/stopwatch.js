define([], function() {
    function StopWatch() {
        this.offset = Date.now();
        this.end = Date.now();
    }

    StopWatch.prototype.start = function() {
        this.offset = Date.now();
    };

    StopWatch.prototype.stop = function() {
        this.end = Date.now();
    };

    StopWatch.prototype.duration = function() {
        return Math.floor((this.end - this.offset) / 1000);
    };

    StopWatch.prototype.formatDuration = function() {
        var time = this.duration(),
            mins = Math.floor(time / 60),
            secs = time % 60;

        secs = secs < 10 ? '0' + secs : secs;

        return mins + ':' + secs;
    };

    return StopWatch;
});