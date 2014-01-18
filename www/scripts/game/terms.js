define(['knockout', 'lodash', 'zepto', 'events'], function(ko, _, $, events) {

    var goToNext = function($target) {
        var next = $target.parents('.q').next().find('input');
        if (next.length > 0) {
            next.focus();
        } else {
            events.trigger('endGame');
        }
    };

    function getTermData(type) {
        var data = {}, sum;
        switch (type) {
            case Term.subtraction:
                data.operator = '-';
                data.a = _.random(0, 9);
                data.b = _.random(0, data.a);
                data.answer = data.a - data.b;
                break;
            case Term.addition:
            default:
                data.operator = '+';
                data.a = _.random(0, 9);
                data.b = _.random(0, 9);
                data.answer = data.a + data.b;
                break;
        }
        return data;
    }

    function buildTerm() {
        var chance = _.random(0, 1, true), selectedType = Term.addition;

        if (chance <= 0.2) {
            selectedType = Term.subtraction;
        }
        return new Term(getTermData(selectedType));
    };

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

    Terms.prototype.reset = function() {
        var i;
        this.list.removeAll();
        for (i = 0; i < 10; i++) {
            this.list.push(buildTerm());
        }
    };

    return new Terms();

});