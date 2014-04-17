define(["eventBus"], function(eventBus){
    "use strict";
    
    
    var sounds = {
        "explosion":createHowl
    }


    function createAudio(file) {
        var sound = new Howl({
          urls: [file],
          autoplay: true,
          loop: true,
          volume: 0.5,
          onend: function() {
            console.log('Finished!');
          }
        });
    }

});