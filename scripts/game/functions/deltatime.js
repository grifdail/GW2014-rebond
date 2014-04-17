define([], function(){
    "use strict";
    
    var old = Date.now();
    var f = 1000/30
    return function() {
        var now = Date.now();
        var delta = Math.min(now-old,100)/f;
        old = now;
        return delta;
    } 
});