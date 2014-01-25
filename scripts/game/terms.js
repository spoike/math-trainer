define(['knockout', 'lodash', 'zepto', 'events'], function(ko, _, $, events) {

    var goToNext = function($target) {
        var next = $target.parents('.q').next(), nextInput = next.find('input'), list = $('.q-list');
        if (next.length > 0) {
            nextInput.focus();
        } else {
            events.trigger('endGame');
        }
        list.css('margin-top', 150 - (next.index() * 100) + 'px');
    };

    function getTermData(type) {
        var data = {};
        switch (type) {
            case Term.division:
                data.operator = '÷';
                data.b = _.random(1, 9);
                data.answer = _.random(0, 9);
                data.a = data.b * data.answer;
                break;
            case Term.multiplication:
                data.operator = '×';
                data.a = _.random(0, 9);
                data.b = _.random(0, 9);
                data.answer = data.a * data.b;
                break;
            case Term.subtraction:
                data.operator = '-';
                data.a = _.random(0, 9);
                data.b = _.random(0, data.a);
                data.answer = data.a - data.b;
                break;
            case Term.addition:
                data.operator = '+';
                data.a = _.random(0, 9);
                data.b = _.random(0, 9);
                data.answer = data.a + data.b;
                break;
            default:
                data.operator = '+';
                data.a = _.random(0, 9);
                data.b = _.random(0, 9);
                data.answer = data.a + data.b;
                break;
        }
        return data;
    }

    function buildTerm(selectedType) {
        selectedType = selectedType || Term.addition;
        return new Term(getTermData(selectedType));
    }

    function buildTimesTerm(times) {
        var data = {}, useTimesOnB = _.random(0, 1) === 0;

        data.operator = '×';
        data.a = useTimesOnB ? _.random(0, 9) : times;
        data.b = useTimesOnB ? times : _.random(0,9);
        data.answer = data.a * data.b;

        return new Term(data);
    }

    function Term(data) {
        this.a = data.a;
        this.b = data.b;
        this.answer = data.answer;
        this.answerLength = this.answer.toString().length;
        this.operator = data.operator;

        this.termDisplay = this.a + ' ' + this.operator + ' ' + this.b;

        this.hasInput = ko.observable(false);
        this.correct = ko.observable(false);
        this.wasCorrect = ko.computed(function() {
            return this.hasInput() && this.correct();
        }, this);
        this.wasIncorrect = ko.computed(function() {
            return this.hasInput() && !this.correct();
        }, this);
    }

    Term.addition = 0;
    Term.subtraction = 1;
    Term.multiplication = 2;
    Term.division = 3;

    Term.prototype.checkAnswer = function(term, evt) {
        var $target = $(evt.target), valStr = $target.val().toString(), val = parseInt(valStr, 10);

        if (valStr.length >= term.answerLength) {
            if (val === term.answer) {
                term.correct(true);
                goToNext($target);
            }
            else {
                term.correct(false);
                $target.val('');
            }
            term.hasInput(true);
        }
    };

    function Terms() {
        this.list = ko.observableArray();
    }

    Terms.easy = 0;
    Terms.hard = 1;

    Terms.prototype.reset = function(difficulty) {
        var left = 20, newList = [];
        difficulty = difficulty || Terms.easy;
        this.list.removeAll();

        if (difficulty === Terms.hard) {
            _.times(4, function() { newList.push(buildTerm(Term.multiplication)); });
            left -= 4;
            _.times(1, function() { newList.push(buildTerm(Term.division)); });
            left -= 1;
        }
        _.times(2, function() { newList.push(buildTerm(Term.subtraction)); });
        left -= 2;
        _.times(left, function() { newList.push(buildTerm()); });

        this.list(_.shuffle(newList));
    };

    Terms.prototype.resetTimes = function(times) {
        var newList = [];

        _.times(20, function() { newList.push(buildTimesTerm(times)); });

        this.list(_.shuffle(newList));
    };

    Terms.getInstance = _.once(function() {
        return new Terms();
    });

    return Terms;

});