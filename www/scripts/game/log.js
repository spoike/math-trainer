define([], function() {
   
   var exports = {},
       debug = false || (document.location.hostname == "localhost");

   exports.event = function(action, label) {
       ga('send', 'event', 'math-trainer', action, label);
       if (debug) {
           console.log('send', 'event', 'math-trainer', action, label);
       }
   };

   return exports;

});