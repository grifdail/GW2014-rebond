define(["eventBus","libs/howler"], function(eventBus){
    "use strict";
    
    function loadAudio(fn) {
        var sounds = {
            "explosion":createAudio("audio/EXPLOSION.ogg"),
            "tir":createAudio("audio/TIR.ogg"),
            "change_color":createAudio("audio/color_change.ogg"),
        };

        eventBus.on("play explosion",function() {
            sounds.explosion.play();
        });

        eventBus.on("play sound",function(e) {
            sounds[e.sound].play();
        })

        var audioToLoad = 0;
        function callback() {
            audioToLoad--;
            if (audioToLoad<=0) {
                fn();
            }
        }
        function createAudio(file) {
            var sound = new Howl({
              urls: [file],
              onload: callback,
              onloaderror: callback
            });
            return sound;
        }
    }
    
    return loadAudio;

});