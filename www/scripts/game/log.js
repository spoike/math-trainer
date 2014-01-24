define([], function() {
   
   var exports = {},
       debug = false || (document.location.hostname == "localhost"),
       category = 'math-trainer';

   exports.event = function(action, label) {
       ga('send', 'event', category, action, label);
       if (debug) {
           console.log('send', 'event', category, action, label);
       }
   };

   exports.timing = function(action, duration, label) {
       if (duration > 0) {
           ga('send', 'timing', category, action, duration, label);
           if (debug) {
               console.log('send', 'timing', category, action, duration, label);
           }
       }
   };

   return exports;

});