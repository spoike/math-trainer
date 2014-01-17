define(['knockout', 'lodash', 'zepto'], function(ko, _, $) {

    var goToNext = function($target) {
        $target.parents('.q').next().find('input').focus();
    };

    function Term() {
        this.a = _.random(0, 9);
        this.b = _.random(0, 9);
        this.answer = this.a + this.b;
        this.answerLength = this.answer.toString().length;
        this.operator = '+';

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

    Term.prototype.checkAnswer = function(term, evt) {
        var $target = $(evt.target), valStr = $target.val().toString(), val = parseInt(valStr, 10);

        if (valStr.length >= term.answerLength) {
            if (val === term.answer) {
                term.correct(true);
            }
            else {
                term.correct(false);
            }
            term.hasInput(true);
            goToNext($target);
        }
    };

    function Terms() {
        this.list = ko.observableArray();
        this.reset();
    }

    Terms.prototype.reset = function() {
        var i;
        this.list.removeAll();
        for (i = 0; i < 10; i++) {
            this.list.push(new Term());
        }
    };

    Terms.prototype.initFocus = function() {
        _.defer(function() {
            $('input').eq(0).focus();
        });
    };

    return new Terms();

});