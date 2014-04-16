define([], function(){
    "use strict";
    
    var old = Date.now();
    var f = 1000/10
    return function() {
        var now = Date.now();
        var delta = Math.max(now-old,100)/f;
        old = now;
        return delta;
    } 
});